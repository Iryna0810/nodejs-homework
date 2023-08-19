import path from "path";
import fs from "fs/promises"
import gravatar from 'gravatar';
import {HttpError, sendEmail} from "../helpers/index.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Jimp from "jimp";
import { nanoid } from "nanoid";


const { JWT_SECRET, BASE_URL } = process.env;
const avatarPath = path.resolve("public", "avatar");

const signup = async (req, res, next) => {
        try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email already in use");
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const verificationToken = nanoid();
           
            const avatarURL = gravatar.url(email)
            const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword, verificationToken });

            const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
            };

           await sendEmail(verifyEmail);


            res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
            token: newUser.verificationToken,
        })
    } catch (error) {
        next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;

        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw HttpError(404, "User not found");
        }

        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "111" });


        res.status(200).json({
         message:"Verification successful"
        })

        

    } catch (error) {
       next(error); 
    }
}

const resendVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email){
            throw HttpError(400, "Missing required field email");
        }
        const user = await User.findOne({ email });
        if (!user){
            throw HttpError(404, "Email not found");
        }
        if (user.verify) {
            throw HttpError(400, "Verification has already been passed");
        }

        const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
        };
        
        await sendEmail(verifyEmail);

        res.status(200).json({
            message: "Verification email sent"
        })

        } catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
    const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        if (!user.verify) {
            throw HttpError(401, "Email not verified");
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

const updateAvatar = async (req, res, next) => {
    try {
        const { path: oldPath, filename } = req.file;
        const { _id, email } = req.user;
        
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Not authorized");
        }
     
        const newPath = path.join(avatarPath, filename);
        await fs.rename(oldPath, newPath);
        
        const image = await Jimp.read(newPath);

        await image.cover(250, 250);
        await image.writeAsync(newPath);

               
        const avatarURL = path.join('avatar', filename)
        await User.findByIdAndUpdate(_id, { avatarURL });
        
        res.json({
            avatarURL,
        })
        

    } catch (error) {
        next(error);
    }
};


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
    updateAvatar,
    logout,
    verifyEmail,
    resendVerifyEmail,
}