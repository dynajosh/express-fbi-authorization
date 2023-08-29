import express from 'express';
import { createCase, fetchCase } from '../controllers/caseControllers';

const router = express.Router();




router.post('/create', createCase)
router.get('/open/:id', fetchCase)




export default router;