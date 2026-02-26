import { Task } from "../models/Task.js";


const getTasks=async(req,res)=>{
    try {
        const task=new Task();
        const resultado=await task.getAll();
        res.json(resultado[0]);
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al consultar la base de datos'});
    }
    
}

const getTaskById=async(req,res)=>{
    const id=req.params.id;
    try {
        const task=new Task();
        const resultado=await task.getById(id);
        if(resultado){
            res.json(resultado[0][0]);
        }else{
           return res.status(500).json({error:'Ha habido un error al consultar la base de datos'}); 
        }
        
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al consultar la base de datos'});
    }
    
}

export {
    getTasks,
    getTaskById
}