
import express from "express";

import getAllCategory from "../controllers/categoryController.js";

const route = express.Router();

route.get("/" , getAllCategory);

export default route;