
import express from "express";
import  { createTransaction , createOrder , getOrdersByUserId } from "../controllers/orderController.js";    

const route = express.Router();

route.post("/transaction" , createTransaction);
route.get("/:userId" , getOrdersByUserId);
route.post("/" , createOrder);


export default route;