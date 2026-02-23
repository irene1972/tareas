import express from 'express';
import {
    getTasks
} from '../controllers/taskController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getTasks);

export default router;