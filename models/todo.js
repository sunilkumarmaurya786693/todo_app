const mongoose=require('mongoose');


// THIS IS SCHEMA OF MODEL WHICH CREATE THE OBJECT OF THIS TYPE
const todoSchema =new mongoose.Schema({


    // THIS IS DESCRIPTION SCHEMA OF TASK
    description:{
        type:String,
        require:true
    },


    // THIS IS CATEGORY SCHEMA OF TASK
    category:{
        type:String,
        require:true
    },


    // THIS IS DATE SCHEMA OF TASK
    date:{
        type:Date,
        require:true
    }


  
});


// CREATE MONGOOSE MODEL OBJECT
const todo =mongoose.model('todo',todoSchema);


// WE EXPORT THE todo SO IT VISIBLE OUTSIDE OF THIS FILE ALSO
module.exports=todo;