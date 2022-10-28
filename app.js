const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const connectdb = require('./db/dbconnect');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());




require('./Routes/routes.js')(app);

const start = async () => {
  try{
    await connectdb();
    app.listen(process.env.port || 3000, function () {
      console.log('Server is up!');
    })
  }catch (error){
    console.log(error);
  }
}

start();
