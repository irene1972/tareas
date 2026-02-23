import express from 'express';
import {
    envioEmail,
    getUsers
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);

export default router;