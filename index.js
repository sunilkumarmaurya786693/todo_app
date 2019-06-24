
// CREATE THE EXPRESS OBJECT
const express = require('express');


// THIS IS PORT NUMBER AT WHICH OUR SERVER RUN
const port = 8000;

// CREATE THE DATABASE OBJECT
const db = require('./config/mongoose');


// CREATE OBJECT OF EXPRESS
const app = express();


// GET THE PATH OBJECT TO SET THE PATH OF CSS FILE,JAVASCRIPT FILE 
const path = require('path');


// EXPORT THE TODO OBJECT FROM THE MODEL
const todo = require('./models/todo');

//FOR DECONDING URL WE USE THIS 
app.use(express.urlencoded());


// WE USE EJS AS TEMPLE ENGINE
app.set('view engine', 'ejs');




// SET THE PATH OF VIEWS FOLDER
app.set('views', path.join(__dirname, 'views'));

//USE THE CSS AND JAVASCRIPT FILE
app.use(express.static('assets'));



// THIS IS HOME PAGE URL
app.get('/', function (req, res) {
    todo.find({}, function (err, todos) {
        if (err) {
            console.log('error', err);
            return;
        }
        return res.render('home',
            {
                title: "TODO APP",
                todo_list: todos
            }
        );
    });



    
});

// THIS IS DELETE URL FOR SINGLE TASK
app.get('/delete_todo_one',function(req,res){
    let id=req.query.id;
    
    todo.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error");return ;
        }
        return res.redirect('back');
    });
});


// THIS IS URL FOR CREATING THE TASK
app.post('/create-todo', function (req, res) {


    
    todo.create(
        {
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err, newtodo) {
            if (err) {
                console.log('error in contact', err);
                return;
            }
            
            return res.redirect('back');
        }
    )
});


// THIS IS URL TO DELETE THE MULTIPLE ITEM FROM DATABASE
app.post('/delete-todo', function (req, res) {
    


    let ids = req.body.task;
    if (typeof (ids) =="string") {
        
        todo.findByIdAndDelete(ids,function(err){
            if (err) { console.log("error in deleting"); return; }
        });
    }
    else {
        
        for (let i = 0; i < ids.length; i++) {
            todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { console.log("error in deleting"); return; }

            });
        }
    }
// RETURN TO THE SAME PAGE 
    return res.redirect('back');
});


// CREATE THE SERVER AT 8000 AS PORT NUMBER
app.listen(port, function (err) {
    if (err) {
        console.log("there is an erro in server", err);
        return;
    }
    console.log("server is running at port number ", port);
});
