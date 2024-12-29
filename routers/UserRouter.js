import { Router } from "express";
import {
  getUserFavProducts,
  postUserSignup,
  postUserSignin,
  postUserlogout,
} from "../controllers/UserController.js";

export const userRouter = Router();

// user/
userRouter.post("/signup", postUserSignup);
userRouter.post("/signin", postUserSignin);
userRouter.post("/logout", postUserlogout);

userRouter.get("/", getUserFavProducts);
