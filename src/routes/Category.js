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
        .json({ message: "A category with this name already exists" });
    }
    const newCategory = new Category({
      name,
      createdBy: userId, // Save the user ID who created the category
    });

    await newCategory.save();
    return res.status(201).json({ message: "Category successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("createdBy", "name surname") // 'name' i 'surname' su polja u modelu User
      .select("name createdBy createdAt updatedAt");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategorija nije pronađen" });
    }
    res.status(200).json({ message: "Kategorija uspješno obrisan" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška prilikom brisanja korisnika", error });
  }
});

router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

 

  try {
    // Pronađi kategoriju po ID-u i ažuriraj naziv
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Vraća ažurirani dokument
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
