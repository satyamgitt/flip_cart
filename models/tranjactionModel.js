import mongoose , {Schema} from "mongoose";

const TranjactionSchema = new Schema({
    user:{type: mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    order:{type: mongoose.Schema.Types.ObjectId , ref:"Order" , required:true},
    paymentId:{type: String , required:true}, // that we will get from razar pay
    orderId:{type: String , required:true},
    status:{
        type: String ,
        enum:["Success" , "Failed" , "Pending"],
        required:true
    },
    amount:{type: Number , required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

})

const Tranjaction = mongoose.model("Tranjaction" , TranjactionSchema)
export default Tranjaction;

