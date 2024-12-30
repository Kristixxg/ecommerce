import { Router } from "express";
import {
  getProducts,
  getProductbyId,
  putFavoriteProduct,
} from "../controllers/ProductController.js";
export const productRouter = Router();

//prducts/
productRouter.get("/", getProducts);
productRouter.put("/", putFavoriteProduct);
productRouter.get("/details/:id", getProductbyId);
