import multer from "multer";
import Book from "../models/Book.js";
import express from "express";

const router = express.Router();

// Konfiguracija za pohranu slike
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads"); // Direktorij u kojem će se slike pohranjivati
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta za dodavanje knjige
router.post("/books", upload.single("image"), async (req, res) => {
  try {
    const { title, author, year, description, price, category, addedBy } =
      req.body;
    const image = req.file ? req.file.filename : null;

    // Spremi knjigu u bazu podataka
    const newBook = new Book({
      title,
      author,
      year,
      description,
      price,
      category,
      image,
      addedBy,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Greška pri dodavanju knjige:", error);
    res.status(500).json({ message: "Greška pri dodavanju knjige", error });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({})
      .populate("addedBy", "name surname")
      .populate("category", "name") // Populiraj kategoriju // 'name' i 'surname' su polja u modelu User
      .select(
        "title author year description price category image addedBy createdAt updatedAt"
      );
    res.json(books);
  } catch (error) {
    console.error("Detalji greške:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
