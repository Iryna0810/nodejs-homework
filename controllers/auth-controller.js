import HttpError from "../helpers/HttpError.js";
import User from "../models/users.js";

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }       
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