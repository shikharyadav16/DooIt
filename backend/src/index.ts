import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db";
import routes from "./routes/index";
import cors from "cors"

import type { Express } from "express";

const app: Express = express();

app.use(cors({
    origin: ["http://127.0.0.1:5713", "http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use("/api", routes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log("Server is listening at PORT:", PORT);
})


