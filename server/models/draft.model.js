import mongoose from "mongoose";

const draftSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    content: { type: String, default: "" }, 
    category: { type: String, enum: ["yoga", "meditation", "breathwork", "stretching", "other"], default: "other" },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    durationMins: { type: Number, default: 5 },
    tags: { type: [String], default: [] },
    coverImage: { type: String },
    autosaveVersion: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model("Draft", draftSchema);
