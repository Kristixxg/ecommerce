import { Router } from "express";
import jwtValidation from "../middlewares/AuthMiddleware.js";
import {
  getUserFavProducts,
  deleteUserFavoritebyId,
  postUserSignup,
  postUserSignin,
  postUserlogout,
  getAll,
} from "../controllers/UserController.js";
import { createUserValidation } from "../middlewares/UserMiddleware.js";

export const userRouter = Router();

// user/
userRouter.post("/signup", createUserValidation, postUserSignup);
userRouter.post("/signin", createUserValidation, postUserSignin);
userRouter.get("/all", getAll);
userRouter.post("/logout", postUserlogout);
userRouter.get("/products", jwtValidation, getUserFavProducts);
userRouter.delete("/product/:id", deleteUserFavoritebyId);
