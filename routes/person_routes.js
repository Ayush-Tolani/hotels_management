const express=require('express');
const router=express.Router();
const Person=require('./../modules/person')
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/singup',async(req,res)=>{
    try {
        const data =req.body

        const newPerson = new Person(data);

        const response= await newPerson.save();
        console.log('Data saved successfully');

        const payload={
            id: response.id,
            username:response.username,
        }
        console.log(JSON.stringify(payload));
        const token =generateToken(response.username);
        console.log("Token is : ",token);


        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log('Error saving Person : ',err);
        res.status(500).json({error:'Internal server error'})
    }
    
})

router.post('/login',async(req,res)=>{
    try {
        const{username,password}=req.body;

        const user=await Person.findOne({username:username});

        if(!user || !(await user.comparePassword(password)))
        {
            return res.status(401).json({error:"Invalid username or password"});
        }

        const payload ={
            id:user.id,
            username:user.username,
        }

        const token=generateToken(payload);

        res.json({token});  

    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData=req.user;
        console.log("User Data : ",userData);

        const userId=userData.id;
        const user= await Person.findById(userId);

        res.status(200).json({user});
    } catch (error) {
        console.log('Error saving Person : ',error);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/',jwtAuthMiddleware,async(req,res)=>{
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
