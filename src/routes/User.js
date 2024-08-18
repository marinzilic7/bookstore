// routes/userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware za provjeru JWT tokena
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Endpoint za dohvat podataka korisnika
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja korisnika:", error);
    res.sendStatus(500);
  }
});

// API endpoint za registraciju korisnika
router.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password, role, dateRegistered } = req.body;

    // Provjeri postoji li već korisnik s istim emailom
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Korisnik s ovim emailom već postoji" });
    }

    // Jel lozinka duza od 6 karaktera
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Lozinka mora sadržavati najmanje 6 karaktera" });
    }

    // Hashiraj lozinku prije spremanja
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kreiraj novog korisnika
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
      dateRegistered,
    });

    // Spremi korisnika u bazu podataka
    await newUser.save();

    res.status(201).json({ message: "Registracija uspješna" });
  } catch (error) {
    console.error("Greška prilikom registracije korisnika:", error);
    res.status(500).json({ message: "Greška na serveru" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Provjeri postoji li korisnik s navedenim emailom
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Neispravan email ili lozinka" });
    }

    // Provjeri ispravnost lozinke
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Neispravan email ili lozinka" });
    }

    // Generiraj JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Prijava uspješna", token });
  } catch (error) {
    console.error("Greška prilikom prijave korisnika:", error);
    res.status(500).json({ message: "Greška na serveru" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name surname email role dateRegistered"); // Only selecting relevant fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    res.status(200).json({ message: "Korisnik uspješno obrisan" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška prilikom brisanja korisnika", error });
  }
});

export default router;
