import { Router } from "express";
import { getProducts } from "../controllers/ProductController.js";
export const productRouter = Router();

//prducts/
productRouter.get("/", getProducts);
