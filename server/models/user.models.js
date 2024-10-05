import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName: {

        type: String,
        requred: true,
    },
    userName: {

        type: String,
        requred: true,
        unique: true,
    },
    password: {

        type: String,
        requred: true,
        minlength: 6
    },
    gender: {

        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {

        type: String,
        default: "",
    },



});

const User = mongoose.model("User", userSchema);

export default User;