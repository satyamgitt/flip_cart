
import express from "express";
import loginORsignup from "../controllers/userController.js"

const route = express.Router();

route.post("/login" , loginORsignup);


export default route;