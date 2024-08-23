import express from "express";
import bcrypt from "bcrypt";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/cart/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    
    const decoded = jwt.verify(token, "your_jwt_secret_key"); 
    const userId = decoded.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
     
      cart = new Cart({
        userId,
        items: [{ bookId, quantity: 1 }],
      });
    } else {
      
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
       
        cart.items[itemIndex].quantity += 1;
        res
          .status(200)
          .json({
            message:
              "You have increased the quantity of this book in your order.",
            cart,
          });
      } else {
     
        cart.items.push({ bookId, quantity: 1 });
        res.status(200).json({ message: "Book added to cart", cart });
      }
    }

    await cart.save();
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/cart", async (req, res) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }


    const decoded = jwt.verify(token, "your_jwt_secret_key");
    const userId = decoded.id;

   
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
  

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
  const { id } = req.params; 

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, "your_jwt_secret_key");
  const userId = decoded.id;

  try {
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    
    cart.items = cart.items.filter((item) => item.bookId.toString() !== id);

    
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
