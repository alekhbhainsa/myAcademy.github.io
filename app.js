const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;
//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug');
})
app.get('/service', (req, res)=>{
    const params = {}
    res.status(200).render('service.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("you are succesfully registered to our academy A confirmation message will be sent your registered mobile number soon...");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    })
        
    // res.status(200).render('contact.pug', params);
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});