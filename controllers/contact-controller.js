import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
         const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name, email");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error", })
    }
};

const getOneById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, `Contacts with id=${contactId} not found`)
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const addContact = async (req, res, next) => {
    try {      
        const { _id: owner } = req.user;
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result);

        // console.log(req.file);
        // console.log(req.body);
        
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
        if (!result) {
            throw HttpError(400, `Contact with id=${contactId} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updateField = async (req, res) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw new Error(404, `Contacts with id=${contactId} not found`)
        }
        res.json({
            message: "Contact deleted"
        })
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getOneById,
    addContact,
    updateById,
    updateField,
    deleteById
}