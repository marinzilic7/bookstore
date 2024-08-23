import mongoose from 'mongoose';


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
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String, 
        required:true,
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);

export default User;
