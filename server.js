const express=require('express');

const app=express();
const db = require('./db')
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.send('Hare krishna , how can i help you?')
})  


const MenuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menu',MenuItemRoutes);

const personRoutes= require('./routes/person_routes');
app.use('/person',personRoutes);

app.listen(3000,()=>{ console.log('listening to server')})