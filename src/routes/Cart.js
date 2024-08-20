import express from "express";
import bcrypt from "bcrypt";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/cart/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token to get the user ID
    const decoded = jwt.verify(token, "your_jwt_secret_key"); // Replace with your actual secret key
    const userId = decoded.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new Cart({
        userId,
        items: [{ bookId, quantity: 1 }],
      });
    } else {
      // If the user has a cart, check if the book already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        // If the book already exists, increase the quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // If the book doesn't exist, add it to the cart
        cart.items.push({ bookId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Book added to cart", cart });
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/cart", async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify and decode the token to get the user ID
    const decoded = jwt.verify(token, "your_jwt_secret_key");
    const userId = decoded.id;

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    // Ensure book and category are populated

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/cart/:id", async (req, res) => {
  const { id } = req.params; // Ovdje 'id' predstavlja ID knjige (bookId)

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, "your_jwt_secret_key");
  const userId = decoded.id;

  try {
    // Pronađite košaricu korisnika
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filtrirajte iteme u košarici kako biste uklonili onaj koji ima odgovarajući bookId
    cart.items = cart.items.filter((item) => item.bookId.toString() !== id);

    // Spremite ažuriranu košaricu
    await cart.save();

    res
      .status(200)
      .json({ message: "Item successfully removed from cart", cart });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
