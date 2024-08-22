import express from "express";
import bcrypt from "bcrypt";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { firstName, lastName, address, city, cartId, total } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      address,
      city,
      cartId,
      total, 
    });

    await newOrder.save();
    return res.status(201).json({ message: "Order successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding order ", error });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("cartId", "items")

      .select("firstName lastName address city createdAt cartId total");
    res.json(orders);
  } catch (error) {
    console.error("Detalji greške:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/orders/:id", async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Kategorija nije pronađen" });
      }
      res.status(200).json({ message: "Order successfully deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Greška prilikom brisanja korisnika", error });
    }
  });

export default router;
