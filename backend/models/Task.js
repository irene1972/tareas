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
            const result=await pool.query('SELECT * FROM tasks');
            return result;
        } catch (error) {
            return false;
        }

        
    }
}