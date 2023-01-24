import express from "express";
import { findAll, create, update, remove, validate } from './../controllers/Facture.Controller.js'
export const router = express.Router();

router.get('/get', findAll)
router.post('/create', create)
router.put('/update/:id', update)
router.put('/validate/:id', validate)
router.delete('/remove/:id', remove)