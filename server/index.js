import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors({ origin: 'https://mi-turno-web.vercel.app', credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options("*", cors());
app.use("/api", routes);

const port = process.env.PORT || 5000;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });