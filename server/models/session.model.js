import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  type: { type: String },
  content: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" }
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
