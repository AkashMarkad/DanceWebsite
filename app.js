const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyparser = require('body-parser');
const app = express();
const port = 80;

// Connection to mongodb using mongoose 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true , useUnifiedTopology: true});

// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));   // For serving static files 
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');    // set the template engine as pub 
app.set('views', path.join(__dirname, '/views'));    // set the view directory 

app.locals.basedir = path.join(__dirname, 'views');

// ENDPOINTS
app.get('/' , (req , res)=> {
    const con = "This is best content";
    const params = {'title': "Pug is best Tutorial", "content": con}
    res.status(200).render('home.pug' , params);
})

app.get('/contact' , (req , res)=> {
    const con = "This is best content";
    const params = {'title': "Pug is best Tutorial", "content": con}
    res.status(200).render('contact.pug' , params);
})

app.post('/contact' , (req , res)=> {

    var myData = new contact(req.body);
    myData.save().then(()=> {
        res.send("This items has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})

