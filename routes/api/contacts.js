import express from "express";
import contactController from '../../controllers/contact-controller.js'
import schema from '../../schemas/schema.js'
import {isValidId, isEmptyBody} from '../../middlewars/index.js'
import validateBody from "../../decorators/validateBody.js";

const router = express.Router()

router.get('/', contactController.getAll);

router.get('/:contactId', isValidId, contactController.getOneById);

router.post('/', isEmptyBody, validateBody(schema.contactScheme), contactController.addContact);

router.put('/:contactId', isValidId, validateBody(schema.contactScheme), contactController.updateById);

router.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(schema.contactUpdateFavoriteScheme), contactController.updateField);

router.delete('/:contactId', isValidId, contactController.deleteById);

export default router
