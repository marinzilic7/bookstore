import express from "express";
import bcrypt from "bcrypt";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/categories", async (req, res) => {
  try {
    const { name, userId } = req.body;
    const existingCateogry = await Category.findOne({ name });
    if (existingCateogry) {
      return res
        .status(400)
        .json({ message: "Kategorija sa ovim imenom već postoji" });
    }
    const newCategory = new Category({
      name,
      createdBy: userId, // Save the user ID who created the category
    });

    await newCategory.save();
    return res
      .status(201)
      .json({ message: "Kategorija uspjesno dodana" });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
});

router.get("/categories", async (req, res) => {
    try {
      const categories = await Category.find({})
        .populate('createdBy', 'name surname') // 'name' i 'surname' su polja u modelu User
        .select('name createdBy createdAt updatedAt');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

 

export default router;
