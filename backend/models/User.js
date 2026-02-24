import pool from '../config/db.js';
import mysql from 'mysql2/promise';

export class User {
    constructor(name, surname, email, password, token) {
        this.id = 0;
        this.role = 'ROLE_USER';
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.confirm = false;
        this.token = token;
        this.created_at = new Date();
    }

    async getAll() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result;
        } catch (error) {
            return false;
        }

        //debug sql
        /*
        const sql = `SELECT * FROM users`;

        const values = [];

        console.log(mysql.format(sql, values));

        const result = await pool.query(sql, values);
        return result;
        */

    }

    async getByToken(token) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE token=?', [token]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insert() {
        try {
            const result = await pool.query('INSERT INTO users (role,name,surname,email,password,token,created_at) VALUES (?,?,?,?,?,?,?)', [
                this.role, this.name, this.surname, this.email, this.password, this.token, this.created_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async confirmUser(email) {
        
        try {
            const result = await pool.query('UPDATE users SET confirm=1, token=null WHERE email=?', [
                email
            ]);
            return result;
        } catch (error) {
            return false;
        }


    }
}