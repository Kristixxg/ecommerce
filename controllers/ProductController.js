import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const getAllProducts = async (req, res) => {
  try {
    const allproducts = await Product.find();
    return res.status(200).json(allproducts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postCreateFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const isAlreadyFavorite = user.favorites.some(
      (product) => String(product["_id"]) === String(productId)
    );
    if (isAlreadyFavorite) {
      return res.status(400).json({ message: "Product is already favorited!" });
    }
    user.favorites.push(productId);
    await user.save();
    return res.status(201).json({ message: `product added` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const favoriteIndex = user.favorites.findIndex(
      (product) => String(product["_id"]) === String(productId)
    );
    if (favoriteIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in favorites!" });
    }

    user.favorites.splice(favoriteIndex, 1);
    user.favorites = newList;
    await user.save();
    return res
      .status(200)
      .json({ message: `product deleted from favorite - ${user}` });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
