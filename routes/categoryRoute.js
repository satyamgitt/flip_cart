
import express from "express";

import getAllCategories from "../controllers/categoryController.js";

const route = express.Router();

route.get("/" , getAllCategories);

export default route;