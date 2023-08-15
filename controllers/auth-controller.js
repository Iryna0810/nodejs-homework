import path from "path";
import fs from "fs/promises"
import HttpError from "../helpers/HttpError.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatar");

const signup = async (req, res, next) => {
        try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const { path: oldPath, filename } = req.file;
            const newPath = path.join(avatarPath, filename);

            await fs.rename(oldPath, newPath);        
            const avatarURL = path.join('avatar', filename)
            const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword });

            res.status(201).json({
            name: newUser.name,
            email: newUser.email,
        })
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
    const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
        }
         const payload = {
                id: user._id,
        }
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });
        
        res.json({
            token,
        })
    } catch (error) {
        next(error);        
    }
}

const getCurrent = async (req, res, next) => {
    try {
        const { name, email, subscription } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Not authorized");
        }

        res.json({
            name,
            email,
            subscription,
        })
    } catch (error) {
        next(error); 
    }
}

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" })
        
        res.status(204).json({
            message: "No Content",
        })

    } catch (error) {
        next(error);
    }
}

export default {
    signup,
    signin,
    getCurrent,
    logout,
}