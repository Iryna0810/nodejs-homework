import express from "express";
import validateBody from "../../decorators/validateBody.js";
import userShema from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(userShema.userSignUpSchema), authController.signup);

authRouter.post("/login", validateBody(userShema.userSignInSchema), authController.signin)

export default authRouter