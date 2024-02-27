const express = require('express');
const app = express();
const port = 5501;

//setting view engine
app.set('view engine','ejs');

//json parsing
const data = require('./db.json')

//setting routes
app.get('/',(req,res)=>{
    res.render('index',{movies:data.movies});
})

app.get('/cards',(req,res)=>{
    res.render('cards',{movies:data.movies});
})

app.get('/table',(req,res)=>{
    res.render('table',{movies:data.movies});
})

//starting server
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})