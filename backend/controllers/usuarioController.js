import { encriptarPassword } from '../helpers/password.js';
import { crearToken, decodificarToken } from '../helpers/token.js';
import { User } from '../models/User.js';
import enviarEmail from '../helpers/email.js';

const getUsers = async (req, res) => {
    try {
        const usuario = new User();
        const resultado = await usuario.getAll();
        //const resultado=await pool.query('SELECT * FROM usuarios');
        if (resultado[0]) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const createUser = async (req, res) => {

    const { nombre, apellidos, email, password } = req.body;

    if (!nombre | !apellidos | !email | !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newPassword = await encriptarPassword(password);

    if (newPassword === 'error') {
        return res.status(500).json({ error: 'Ha habido un error al encriptar el password' });
    }


    try {
        const token = crearToken(email);
        const usuario = new User(nombre, apellidos, email, newPassword, token);

        enviarEmail({
            email,
            nombre,
            token
        });

        const resultado = await usuario.insert();
        if (resultado[0].affectedRows === 1) {
            res.json({ mensaje: 'Datos insertados correctamente' });
        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al insertar los datos' });
    }

}

const confirmar = async (req, res) => {

    const { token } = req.body;

    try {

        const decodedToken = await decodificarToken(token, process.env.JWT_SECRET);

        if (decodedToken === 'error') {
            return res.status(500).json({ error: 'Token no válido' });
        }

        if (decodedToken.user) {
            const email = decodedToken.user;

            const usuario = new User();
            const resultado = await usuario.confirmUser(email);

            if (resultado[0].affectedRows === 1) {
                res.json({ mensaje: 'Usuario confirmado con éxito' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al confirmar' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al confirmar' });
    }

}

export {
    getUsers,
    createUser,
    confirmar
}