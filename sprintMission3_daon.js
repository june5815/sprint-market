import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use( cors({ origin: "*", }));


app.listen(process.env.PORT || 3000, () => {
  console.log("The server is starting on port 3000.");
});
