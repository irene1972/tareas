import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app=express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

dotenv.config();

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/tareas',taskRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});