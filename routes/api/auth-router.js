import express from "express";
import validateBody from "../../decorators/validateBody.js";
import userShema from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";
import {upload} from '../../middlewars/index.js'
import { authenticate } from "../../middlewars/index.js" 

const authRouter = express.Router();

//signup
authRouter.post('/register', upload.single('avatar'), validateBody(userShema.userSignUpSchema), authController.signup);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post("/verify", validateBody(userShema.emailSchema), authController.resendVerifyEmail);

//signin
authRouter.post("/login", validateBody(userShema.userSignInSchema), authController.signin)

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/avatars",  authenticate, upload.single('avatar'), authController.updateAvatar)

authRouter.get("/logout", authenticate, authController.logout);

export default authRouter