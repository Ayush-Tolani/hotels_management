const express=require('express');

const app=express();
const db = require('./db')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const port = process.env.port ||3000;

app.get('/',function(req,res){
    res.send('Hare krishna , how can i help you?')
})  


const MenuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menu',MenuItemRoutes);

const personRoutes= require('./routes/person_routes');
app.use('/person',personRoutes);
app.listen(port,()=>{ console.log('listening to server')})

//comment added