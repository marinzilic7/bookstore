import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';



// Inicijaliziraj dotenv
dotenv.config();

// Kreiraj Express aplikaciju
const app = express();
app.use(cors());
app.use(express.json());

// Postavi port
const port = process.env.PORT || 3000;

// Poveži se s MongoDB-om
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Povezan s MongoDB-om'))
  .catch(error => console.error('Greška prilikom povezivanja s MongoDB-om:', error));


  const korisnikSchema = new mongoose.Schema({
    name: String,
    surname: String
});

// Kreiraj model
const Korisnik = mongoose.model('users', korisnikSchema);



// API endpoint za dohvaćanje korisnika
app.get('/api/users', async (req, res) => {
    try {
        const korisnici = await Korisnik.find();
        console.log('Dohvaćeni korisnici:', korisnici);
        res.json(korisnici);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
        res.status(500).json({ message: error.message });
    }
});



// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});

