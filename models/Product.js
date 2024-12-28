import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    imageURL: { type: String },
  },
  { collection: "products" }
);

export const Product = mongoose.model("Product", ProductSchema);
