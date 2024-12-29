import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    role: { type: String, default: "guest" },
  },
  { collection: "users" }
);

export const User = mongoose.model("User", UserSchema);
