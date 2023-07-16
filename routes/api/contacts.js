// const express = require('express')

import express from "express"
import contactsServices from '../../models/contacts.js';
import {HttpError} from '../../helpers/index.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
  const result = await contactsServices.listContacts();
  res.json(result);    
  } catch (error) {
    res.status(500).json({message: "Server error",})
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await contactsServices.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`)
      // const error = new Error(`Contacts with id=${contactId} not found`)
      // error.status = 404;
      // throw error;
  //   return res.status(404).json({
  //   message: `Contacts with id=${contactId} not found`
  // })
}
    res.json(result);
  } catch (error) {
    // const { status = 500, message = "Server error"} = error;
    // res.status(status).json({message,})
    next(error);
  }
  
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

// module.exports = router

export default router
