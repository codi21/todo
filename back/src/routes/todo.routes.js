import { Router } from 'express';
import { getTodo , createTodo , deleteTodo , updateTodo } from '../controllers/todo.controllers.js';

const router = Router();

router.get('/todo',getTodo);
router.post('/todo',createTodo);
router.patch('/todo/:id',updateTodo);
router.delete('/todo/:id',deleteTodo);

export default router;
