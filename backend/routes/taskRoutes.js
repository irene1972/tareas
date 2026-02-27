import express from 'express';
import {
    getTasks,
    getTaskById,
    crearTarea,
    editarTarea,
    eliminarTarea
} from '../controllers/taskController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.get('/listar',getTasks);
router.get('/obtener-tarea/:id',getTaskById);
router.post('/crear',crearTarea);
router.put('/editar/:id',editarTarea);
router.delete('/eliminar/:id',eliminarTarea);

export default router;