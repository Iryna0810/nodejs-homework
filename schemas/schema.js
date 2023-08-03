import Joi from "joi";

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
  owner: Joi.string(),
})

const contactUpdateFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required()
})

export default {
  contactScheme,
  contactUpdateFavoriteScheme
}

