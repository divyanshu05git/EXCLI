import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';

const app = express();
app.use(express.json());

app.post("/signup",async (req,res)=>{
    res.json({
        userId:"1234"
    })
})

app.post("/signin",async (req,res)=>{
    
    const userId=1;
    const token=jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        token:token
    })
})

app.get("/room",middleware,async (req,res)=>{
    res.json({
        roomId:"room123"
    })
})

app.listen(5050, () => {
  console.log('HTTP backend server is running ');
})