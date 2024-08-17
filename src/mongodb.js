import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importiraj korisničke rute
import userRoutes from './routes/User.js';

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

// Koristi korisničke rute
app.use('/api', userRoutes);

// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
