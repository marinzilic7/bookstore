import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
