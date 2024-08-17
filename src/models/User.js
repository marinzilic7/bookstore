import mongoose from 'mongoose';

// Definicija sheme za korisnika
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Email mora biti jedinstven
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String, 
        required:true,
    }
});

// Kreiranje modela na osnovu sheme
const User = mongoose.model('User', userSchema);

export default User;
