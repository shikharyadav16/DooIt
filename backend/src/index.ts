import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db";
import type { Express } from "express";
import routes from "./routes/index";

const app: Express = express();
app.use(cookieParser());
app.use(express.urlencoded());

connectToDb();

app.use("/api", routes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log("Server is listening at PORT:", PORT);
})


