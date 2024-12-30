import { Router } from "express";
import jwtValidation from "../middlewares/AuthMiddleware.js";
import {
  getUserFavProducts,
  deleteUserFavoritebyId,
  postUserSignup,
  postUserSignin,
  postUserlogout,
  getAll
} from "../controllers/UserController.js";

export const userRouter = Router();

// user/
userRouter.post("/signup", postUserSignup);
userRouter.get("/all", getAll);
userRouter.post("/signin", postUserSignin);
userRouter.post("/logout", postUserlogout);
userRouter.get("/products", jwtValidation, getUserFavProducts);
userRouter.delete("/product/:id", deleteUserFavoritebyId);
