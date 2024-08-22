import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    total: { type: Number, required: true },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
