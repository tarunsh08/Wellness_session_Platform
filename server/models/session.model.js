import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" }
}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);
