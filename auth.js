
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person=require('./modules/person');

passport.use(new LocalStrategy(async(username,password,done)=>{
    try {
        // console.log('Recived credentials : ',username,password);
        const user=await Person.findOne({username:username});
        if(!user)
            done(null,false,{message:"Incorrect username."});

        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch)
            return done(null,user);
        else
            return done(null,false,{message:"Incorrect password."});

    } catch (error) {
        return done(error);
    }
}))

module.exports=passport; 