import { Task } from "../models/Task.js";


const getTasks = async (req, res) => {
    try {
        const task = new Task();
        const resultado = await task.getAll();
        res.json(resultado[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
    }

}

const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const task = new Task();
        const resultado = await task.getById(id);
        if (resultado) {
            res.json(resultado[0][0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
    }

}

const crearTarea = async (req, res) => {
    const { user_id, title, content, priority, hours } = req.body;

    try {
        const task = new Task(user_id, title, content, priority, hours);
        const resultado = await task.insert();
        console.log(resultado);
        if (resultado) {
            if (resultado[0].affectedRows === 1) {
                res.json({ mensaje: 'Tarea guardada correctamente' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
            }
        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al insertar los datos' });
    }
}

const eliminarTarea = async (req, res) => {
    const id=req.params.id;

    try {
        const task = new Task();
        const resultado = await task.delete(id);
        if(resultado){
            if(resultado[0].affectedRows===1){
                res.json({ mensaje: 'Tarea eliminada correctamente' });
            }else{
                return res.status(500).json({ error: 'Ha habido un error al eliminar los datos en la bd' });
            }
        }else{
            return res.status(500).json({ error: 'Ha habido un error al eliminar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al eliminar los datos' });
    }
}

export {
    getTasks,
    getTaskById,
    crearTarea,
    eliminarTarea
}