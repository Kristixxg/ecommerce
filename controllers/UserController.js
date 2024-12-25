import { User } from "../models/User.js";

const getUserById = async (req, res) => {
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

const postCreateUser = async (req, res) => {
  try {
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    const existingUseremail = await User.findOne({ email: req.body.email });

    if (existingUseremail || existingUsername) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
