import multer from "multer";
import Book from "../models/Book.js";
import express from "express";

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.get("/books/search", async (req, res) => {
  try {
    const { title } = req.query;

    const books = await Book.find({
      title: { $regex: title, $options: "i" },
    });

    res.json(books);
  } catch (error) {
    console.error("Greška pri pretrazi knjiga:", error);
    res.status(500).json({ message: "Greška na serveru prilikom pretrage knjiga" });
  }
});




router.post("/books", upload.single("image"), async (req, res) => {
  try {
    const { title, author, year, description, price, category, addedBy } =
      req.body;
    const image = req.file ? req.file.filename : null;

 
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
      .populate("category", "name") 
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

router.delete("/books/:id", async (req, res) => {
  try {
    const books = await Book.findByIdAndDelete(req.params.id);
    if (!books) {
      return res.status(404).json({ message: "Kategorija nije pronađen" });
    }
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška prilikom brisanja korisnika", error });
  }
});



router.put("/books/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, author, year, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        year,
        description,
        price,
        category,
        image: image ? image : undefined, 
        updatedAt: Date.now(),
      },
      { new: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }

    res
      .status(200)
      .json({ message: "Knjiga uspješno ažurirana", book: updatedBook });
  } catch (error) {
    console.error("Greška pri ažuriranju knjige:", error);
    res.status(500).json({ message: "Greška pri ažuriranju knjige", error });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("addedBy", "name surname")
      .populate("category", "name") 
      .select(
        "title author year description price category image addedBy createdAt updatedAt"
      );
    if (!book) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }
    res.json(book);
  } catch (error) {
    console.error("Detalji greške:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
