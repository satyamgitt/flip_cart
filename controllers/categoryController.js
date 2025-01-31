import Category from "../models/categoryModel.js";

const getAllCategories = async (req, res) => {

  

    try {

        const categories = await Category.find({})
        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failed to Retrieve Category",
            error: error.message
        })
    }

}
export default getAllCategories