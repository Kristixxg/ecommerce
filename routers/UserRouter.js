import { Router } from "express";
import { getUserFavProducts } from "../controllers/UserController.js";

export const userRouter = Router();

// user/
userRouter.get("/", getUserFavProducts);
