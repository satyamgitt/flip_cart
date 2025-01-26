import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config()

const app = express();

app.use(express.json());


app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);


const start = async () => {
    try {
        app.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
            if (err) {
                console.log("Error in Startting the server", err)
            } else {
                console.log("Server is Runing on http://localhost:3000");
            }
        })
    } catch (error) {
        console.log("connection Error", error);
    }

}

start();