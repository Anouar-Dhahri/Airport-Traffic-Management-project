import express from "express";
import { login, profile } from './../controllers/Auth.Controller.js'
export const router = express.Router();

router.post('/login', login)
router.put('/profile/:id', profile)