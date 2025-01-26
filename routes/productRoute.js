
import express from "express";
import getProductsByCategoryId from "../controllers/productController.js";

const route = express.Router();

route.get("/:categoryId", getProductsByCategoryId);

export default route;