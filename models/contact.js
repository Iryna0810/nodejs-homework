import { Schema, model } from "mongoose";
import {handleSaveError,validateAtUpdate} from './hooks.js'


const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, 'Set email for contact']
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey:false, timestamps: true}
);

contactsSchema.pre("findOneAndUpdate", validateAtUpdate);

contactsSchema.post("save", handleSaveError);
contactsSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;

