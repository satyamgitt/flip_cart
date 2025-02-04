import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import connectDB from "./config/connect.js";
import { PORT } from "./config/config.js";
import { buildAdminJS } from "./config/setup.js";

dotenv.config()

const app = express();

app.use(express.json());


app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);


const start = async () => {
    try {


        await connectDB(process.env.MONGO_URI)

        await buildAdminJS(app)

        app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
            if (err) {
                console.log("Error in Startting the server", err)
            } else {
                console.log(`Server is Runing on http://localhost:${PORT}/admin`);
            }
        })
    } catch (error) {
        console.log("connection Error", error);
    }

}

start();