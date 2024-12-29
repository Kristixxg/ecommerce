import morgan from "morgan";
import express from "express";
import { productRouter } from "./routers/ProductRouter.js";
import { userRouter } from "./routers/UserRouter.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/products", productRouter);
app.use("/user", userRouter);
app.all("*", (_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});
