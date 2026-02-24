import pool from '../config/db.js';
//import mysql from 'mysql2/promise';

export class User{
    constructor(name,surname,email,password){
        this.id=0;
        this.role='ROLE_USER';
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.created_at=new Date();
    }

    async getAll(){
        try {
            const result=await pool.query('SELECT * FROM users');
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

    async insert(){
        //try {
            const result=await pool.query('INSERT INTO users (role,name,surname,email,password,created_at) VALUES (?,?,?,?,?,?)',[
                this.role,this.name,this.surname,this.email,this.password,this.created_at
            ]);
            return result;
        //} catch (error) {
           // return false;
        //}
    }
}