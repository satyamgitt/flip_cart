
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Tranjaction from "../models/tranjactionModel.js";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import * as AdminjsMongoose from "@adminjs/mongoose";
import { COOKIE_PASSWORD } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";


AdminJS.registerAdapter(AdminjsMongoose)

// credentials creation for admin

const DEFAULT_ADMIN = {
    email: "satyam@gmail.com",
    password: "12345678"
}


const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return Promise.resolve(false)
}


export const buildAdminJS = async (app) => {

    const admin = new AdminJS({
        resources: [
            { resource: Product },
            { resource: Category },
            { resource: Order },
            { resource: User },
            { resource: Tranjaction }
        ],
        branding: {
            companyName: "FCart",
            softwareBrothers: "FCart",
            withMadeWithLove: false,
        },
        defaultTheme: dark,
        availableThemes: [dark, light, noSidebar],
        rootPath: "/admin",
    });


    const MongoDBStore = ConnectMongoDBSession(session);
    const sessionStore = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: "sessions"
    })

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
        authenticate,
        cookieName: "adminjs",
        cookiePassword: COOKIE_PASSWORD,
        store: sessionStore
    },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
            name: "adminjs",
        }

    )

    app.use(admin.options.rootPath, adminRouter);




} 