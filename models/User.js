import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, minlength: 8 },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    role: { type: String, default: "guest" },
  },
  { collection: "users" }
);

export const User = mongoose.model("User", UserSchema);
