// Mongoose Connection with Atlas
const mongoose = require('mongoose');


const MONGODB_uri = 'mongodb+srv://garrixer05:ankit123@cluster0.vm0qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_uri2 = 'mongosh "mongodb+srv://cluster0.vm0qp.mongodb.net/myFirstDatabase" --apiVersion 1 --username garrixer05'

const connectdb = async ()=>{
  await mongoose.connect(MONGODB_uri || 'mongodb://localhost/Contact', {
    useNewUrlParser : true,
    useUnifiedTopology : true
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
  });

}
module.exports = connectdb
