// Mongoose Connection with Atlas
const mongoose = require('mongoose');


const MONGODB_uri = 'mongodb+srv://garrixer05:ankit123@cluster0.vm0qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


module.exports = function connectdb() {
    mongoose.connect(MONGODB_uri || 'mongodb://localhost/Contact', {
    useNewUrlParser : true,
    useUnifiedTopology : true
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
  });

}
