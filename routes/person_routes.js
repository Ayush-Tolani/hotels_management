const express=require('express');
const router=express.Router();
const Person=require('./../modules/person')


router.post('/',async(req,res)=>{
    try {
        const data =req.body

        const newPerson = new Person(data);

        const reponse= await newPerson.save();
        console.log('Data saved successfully');
        res.status(200).json(reponse);
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
    
})

router.get('/',async(req,res)=>{
    try {
        const data=await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/:worktype',async(req,res)=>{
    try {
        const worktype=req.params.worktype;
        if(worktype=='chef'|| worktype=='manager'||worktype=='waiter')
        {
            const data=await Person.find({work:worktype});
            console.log('Data fetched successfully');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error:"Invalid work  type"});
        }
        
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;
        const UpdatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId,UpdatePersonData,{
            new:true,
            runValidators:true,
        })

        if(!response)
        {
            return res.status(404).json({error:"Person not Found."});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;

        const response=await Person.findByIdAndDelete(personId);

        if(!response)
        {
            return res.status(404).json({error:"Person not Found."});
        }
        console.log('data deleted');
        res.status(200).json({message:"Person deleted successfully"});
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
})

module.exports=router;
