import User from "../models/user.models.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import generateTokensAndSetcookies from "../utils/generateTokens.js";

export const loginUser = async (req, res) => {

    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        const isPasswordcorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordcorrect) {

            return res.status(400).json({ error: "Invalid username or password" });

        }

        generateTokensAndSetcookies(user.id, res);

        return res.status(201).json({
            _id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller ", error.message);
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
}
export const signupUser = async (req, res) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {

            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ userName });

        if (user) {

            return res.status(400).json({ error: "username already exists" });
        }

        // HASH password here

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // https://avatar-placeholder.iran.liara.run

        const boyProfilePic = `https://avatar-placeholder.iran.liran.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar-placeholder.iran.liran.run/public/girl?username=${userName}`;

        const newUser = new User({

            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {

            generateTokensAndSetcookies(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        }
        else {

            return res.status(400).json({ error: "Invalid User data" });
        }

    } catch (error) {
        console.log("Error in signup controller ", error.message);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
}
export const logoutUser = (req, res) => {

    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully" });
    }
    catch (error) {

        console.log("Error in logout controller ", error.message);
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
}