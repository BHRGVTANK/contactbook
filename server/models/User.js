import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    city: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
