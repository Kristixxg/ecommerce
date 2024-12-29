import { Router } from "express";
import {
  getProducts,
  getProductbyId,
} from "../controllers/ProductController.js";
export const productRouter = Router();

//prducts/
productRouter.get("/", getProducts);
productRouter.get("/details/:id", getProductbyId);
