import { HttpError } from "../helpers/index.js";
import User from "../models/users.js";

const signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
        })
    } catch (error) {
        next(error);
    }
};


export default {
    signup,
}