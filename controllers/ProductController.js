import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { brand, type } = req.query;

    let products = [];
    if (!brand && !type) {
      products = await Product.find();
    } else if (!brand) {
      const typeArr = type.split(";");
      products = await Product.find({ category: { $in: typeArr } });
      console.log(products);
    } else if (!type) {
      const brandArr = brand.split(";");
      products = await Product.find({ brand: { $in: brandArr } });
      console.log(products);
    } else {
      const typeArr = type.split(";");
      const brandArr = brand.split(";");
      products = await Product.find({
        brand: { $in: brandArr },
        category: { $in: typeArr },
      });
    }

    const limit = 9;
    const start = (page - 1) * limit;
    const end = page * 9;

    const totalPages = Math.ceil(products.length / limit);
    const paginatedProducts = products.slice(start, end);
    return res.status(200).json({
      products: paginatedProducts,
      totalPages,
    });
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
