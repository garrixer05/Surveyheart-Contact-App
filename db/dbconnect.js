// Mongoose Connection with Atlas
const mongoose = require('mongoose');



const connectdb = async ()=>{
  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb://localhost/Contact', {
    useNewUrlParser : true,
    useUnifiedTopology : true
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
  });

}
module.exports = connectdb
