const express=require('express');
const router=express.Router();

const MenuItem=require('./../modules/MenuItems');


router.post('/',async(req,res)=>{
    try {
        const data =req.body

        const newMenu = new MenuItem(data);

        const reponse= await newMenu.save();
        console.log('Data saved successfully');
        res.status(200).json(reponse);
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
    
})


router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})


module.exports=router;