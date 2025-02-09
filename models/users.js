import { Schema, model } from "mongoose";
import  {validateAtUpdate, handleSaveError} from "./hooks.js"
import { emailRegexp } from "../constans/user-constants.js"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],   
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
    default:"",
  },
    avatarURL: {
        type: String,
    },
    token: {
        type: String,
    }
},{versionKey: false, timestamps: true});



userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model('user', userSchema);

export default User;
