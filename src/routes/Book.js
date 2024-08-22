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

    // Ažuriraj knjigu u bazi podataka
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        year,
        description,
        price,
        category,
        image: image ? image : undefined, // Ako nije priložena nova slika, ne ažuriraj image polje
        updatedAt: Date.now(),
      },
      { new: true } // Vraća ažurirani dokument
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
      .populate("category", "name") // Populiraj kategoriju
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
