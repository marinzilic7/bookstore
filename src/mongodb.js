import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoutes from './routes/User.js';
import categoryRoutes from './routes/Category.js';
import bookRoutes from './routes/Book.js';
import cartRoutes from './routes/Cart.js'; 
import orderRoutes from './routes/Order.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;


const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Povezan s MongoDB-om'))
  .catch(error => console.error('Greška prilikom povezivanja s MongoDB-om:', error));


app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', bookRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/src/uploads', express.static('src/uploads'));
// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
