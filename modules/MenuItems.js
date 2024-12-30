const mongoose=require('mongoose');

const menuItemSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_salse:{
        type:Number,
        default:0,
    }
})

const MenuItems = mongoose.model('MenuItems',menuItemSchema);

module.exports=MenuItems;