import { pool } from '../db.js';

export const getTodo = async(req,res) => {
  try{
 const [todo] = await pool.query('SELECT * FROM todo');
    res.send(todo);
  }catch(err){
    res.json({
      error: err.message
    })
  }
}
export const createTodo = async (req,res) => {
  console.log(req.body);
  const {description,thisdate,priority,completed } = req.body;
  try{
    const [todo] =await pool.query('INSERT INTO todo(description,thisdate,priority,completed) VALUES(?,CURDATE(),?,?)',[description,priority,completed]);
    res.send(todo);
  }catch(err){
    res.json({
      error: err.message
    })
  }
  
}
export const deleteTodo = async (req,res) => {
  const id  = req.params.id;
  console.log(id);
  try{
   const todo= await pool.query('DELETE FROM todo WHERE id = ?',[id]);
    res.send(todo);
  }catch(e){
    res.json({
      error : e.message
    });
  }
}
export const updateTodo= async (req,res) => {
  const { description,priority,completed } = req.body;
  const today = new Date();
  let month = today.getMonth()+1;
  let thisdate = today.getFullYear()+'-'+month+'-'+today.getDate();
  try {
    const todo = await pool.query('UPDATE todo SET description=IFNULL(?,description),priority=IFNULL(?,priority),completed=IFNULL(?,completed),thisdate=IFNULL(?,thisdate) WHERE id = ?',[description ,priority,completed,thisdate, [req.params.id]]);
    console.log(todo);
    res.send(todo);
  }catch(e){
    res.json({
      error : e.message
    })
  }
}

