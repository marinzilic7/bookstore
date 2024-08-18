import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Link to user
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
