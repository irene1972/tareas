import express from 'express';
import {
    getUsers,
    createUser,
    loginUser,
    confirmar
} from '../controllers/usuarioController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/crear',createUser);
router.post('/login',loginUser);
router.put('/confirmar',confirmar);

export default router;