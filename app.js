const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
var bodyParser = require("body-parser");
app.use(express.urlencoded({extended: true}));
//Connect DB
const dbURI = 'mongodb+srv://admin:admin@cluster0.yh2vu.mongodb.net/connectTrend?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {console.log('Mongo connected')})//Listen to requets only after db is connected
    .catch((err) => console.log(err)); 

app.set('view engine', 'ejs');    
app.use(express.urlencoded({extended: true}));    
app.use(express.static('public'));


//Routes
const shopsRoute = require('./routes/shopRoute')
app.use('/shops', shopsRoute)

app.get('/add-new', async (req, res) => {
    res.render("new-shop")
})
app.get('/', (req, res) => {
    res.render('index')
  })


// Listen to APP  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })  
