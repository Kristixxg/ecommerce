import { User } from "../models/User.js";
import * as argon2 from "argon2";
import { generateToken } from "../utils/generateToken.js";

export const postUserSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(409).json({ message: "Fields are required!" });
    }

    const isExistingUsername = await User.findOne({ username });
    if (isExistingUsername) {
      return res.status(409).json({ message: "This username has registered" });
    }
    const isExistingUserEmail = await User.findOne({ email });
    if (isExistingUserEmail) {
      return res.status(409).json({ message: "This email has registered" });
    }

    const hashedPassword = await argon2.hash(password);
    console.log("hashedPW: ", hashedPassword);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("new user: ", user);

    const token = generateToken(user._id, username);
    console.log("token: ", token);

    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Cannot create user" });
  }
};

export const getUserFavProducts = async (req, res) => {};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const postUserSignin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const token = generateToken(user._id, username);
    console.log(token);

    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
export const postUserlogout = async (req, res) => {
  try {
    return res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ message: "logout failed" });
  }
};
