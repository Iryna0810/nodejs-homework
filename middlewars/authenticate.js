import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/users.js";


const { JWT_SECRET } = process.env;


const authenticate = async (req, res, next) => {
    try {
    const { authorization = "" } = req.headers;
    const [ bearer, token ] = authorization.split(' ');
    if (bearer !== "Bearer") {
      throw HttpError(401, error.message)  
        }
        
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(id);
            if (!user || !user.token) {
                throw HttpError(401, "Not authorized")  
            }
            req.user = user;
            next();
        } catch (error) {
                  throw HttpError(401, "Not authorized")  

        }

    } catch (error) {
        next(error);
    }

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2JmYWM3ZGFlMWFiYjIwMTVkMDg3MiIsImlhdCI6MTY5MTA4OTYzMiwiZXhwIjoxNjkxMTcyNDMyfQ.euBQVL51xmHdqC92cf6oGMqWo_aMjU92xxBaJDoLyfU
     

}

export default authenticate;
