import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";
import Tranjaction from "../models/tranjactionModel.js";




// Razor_pay Implementation
const createTransaction = async (req, res) => {

    // "amount" will come from frontend 
    const { amount, userId } = req.body;

    // Generateing Order Id & initilizing payment using Id and secreat key
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // for doing payment we need to do API call
    const options = {
        amount: amount,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex")
    }

    try {

        if (!amount || !userId) {
            return res.status(400).json({
                success: false,
                msg: "Amount and UseriD is Required"
            })
        }

        const razorPayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            msg: "Order Created Successfully",
            key: process.env.RAZORPAY_KEY_ID,   // client SDK no need to keep in frontend
            amount: razorPayOrder.amount,
            currency: razorPayOrder.currency,
            order_id: razorPayOrder.id,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Error in Creating Order",
            error: error.message
        })

    }

}

const createOrder = async (req, res) => {

    const { razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        userId,
        cartItems,
        deliveryDate,
        address,

    } = req.body


    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // generating signature from razorpay documentation
    const generated_signature = crypto.createHmac('sha256', key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex')


    // varifing signature that came from frontend with generated signature then will have to store order , transaction and give back to frontend data
    if (generated_signature === razorpay_signature) {

        try {

            const transaction = await Tranjaction.create({
                user: userId,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: "Success",
                amount: cartItems.reduce((total, item) => (
                    total + item?.quantity * item?.price
                ), 0)
            });

            const order = await Order.create({
                user: userId,
                deliveryDate,
                address,
                item: cartItems?.map((item) => ({
                    product: item?._id,
                    quantity: item?.quantity
                })),
                status: "Order Placed"
            });

            // storing order in transaction

            transaction.order = order._id;
            await transaction.save()
            res.status(200).json({
                success: true,
                msg: "Payment varified and Order Created",
                order
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                msg: "Error in Creating Order",
                error: error.message
            })
        }
    }


}


// Order Screen on which user can see their order
const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {

        const orders = await Order.find({ user: userId })
            .populate("user", "name email")
            .populate("item.product", "name price image_uri")
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No Order Found",
            });
        }

        res.status(200).json({
            success: true,
            orders
        })




    } catch (error) {
        console.log("get orderByUserId", error)
        res.status(500).json({
            success: false,
            msg: "Failed to Retrieve Order",
            error: error.message
        })
    }

}

export { createTransaction, getOrdersByUserId, createOrder } 