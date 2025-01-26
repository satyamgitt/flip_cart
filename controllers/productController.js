import Product from "../models/productModel.js";


const getProductsByCategoryId = async (req, res) => {

    const { categoryId } = req.params;

    try {
        const products = await Product.find({ category: categoryId })

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No Product Found",
            })
        } else {
            res.status(200).json({
                success: true,
                products
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failed to Retrieve Product",
            error: error.message
        })
    }

}
export default getProductsByCategoryId;