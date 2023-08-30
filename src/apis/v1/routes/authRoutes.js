import express from 'express';
import { login, createUser } from '../controllers/authControllers.js';


const router = express.Router();


router.post('/login', login);
router.post('/create-user', createUser);

export default router