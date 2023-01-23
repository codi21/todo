import express from 'express';
import router from './routes/todo.routes.js';
import './config.js';
import cors from 'cors';
import path from 'path';


const app = express();
app.use(express.json());
app.use(express.static("../front"));
app.use('/api',router);
app.use((req, res, next)=>{
  res.status(400).json({
    message: 'end point not found 404'
  })
});


export default app;
