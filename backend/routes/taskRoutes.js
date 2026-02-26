import express from 'express';
import {
    getTasks,
    getTaskById
} from '../controllers/taskController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getTasks);
router.get('/obtener-tarea/:id',getTaskById);

export default router;