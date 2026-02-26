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
}