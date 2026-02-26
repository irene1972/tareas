import pool from '../config/db.js';

export class Task{
    constructor(user_id,title,content,priority,hours){
        this.id=0;
        this.user_id=user_id;
        this.title=title;
        this.content=content;
        this.priority=priority;
        this.hours=hours;
        this.created_at=new Date();
    }

    async getAll(){
        try {
            const result=await pool.query('SELECT * FROM tasks ORDER BY id DESC');
            return result;
        } catch (error) {
            return false;
        }
    }

    async getById(id){
        try {
            const result=await pool.query(`
                SELECT t.*,u.name,u.surname,u.email,u.created_at  
                    FROM tasks t 
                    INNER JOIN users u ON u.id=t.user_id 
                    WHERE t.id=?
                `,[id]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insert(){
        try {
            const result=await pool.query('INSERT INTO tasks (user_id,title,content,priority,hours,created_at) VALUES (?,?,?,?,?,?)',[
                this.user_id,this.title,this.content,this.priority,this.hours,this.created_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async delete(id){
        try {
            const result=await pool.query('DELETE FROM tasks WHERE id=?',[id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}