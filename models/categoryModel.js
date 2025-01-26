import mongoose , { Schema } from "mongoose";

const CategorySchema = new Schema({
    name:{type:String , required:true},
    image_uri:{type:String , required:true},
    products:[{type:mongoose.Schema.Types.ObjectId , ref:"Product"}] ,   // like foregin-key to cooect product and category
    createdAt:{type:Date , default : Date.now},
    updateddAt:{type:Date , default : Date.now}
})

const Category = mongoose.model("Category", CategorySchema)
export default Category;