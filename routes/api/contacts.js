// const express = require('express')

import express from "express"
import contactsServices from '../../models/contacts.js';

const router = express.Router()

// import router from "express.Router()"

router.get('/', async (req, res, next) => {
  const result = await contactsServices.listContacts();
  res.json(result);
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
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
