const express=require('express');
const app=express();
const db = require('./db')
require('dotenv').config();
const passport=require('./auth');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const port = process.env.Port ||3000;

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`) ;
    next();
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',function(req,res){
    res.send('Hare krishna , how can i help you?')
})  

const personRoutes= require('./routes/person_routes');
const MenuItemRoutes= require('./routes/menuItemRoutes');


app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);


app.listen(port,()=>{ console.log('listening to server')})

//comment added