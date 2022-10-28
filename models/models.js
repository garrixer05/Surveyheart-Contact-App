const mongoose = require('mongoose');
const wrap = require('../middleware/middleware');

// Schema

const contactSchema = new mongoose.Schema ({
  name : String,
  contactNumber : String,
  email : String
});
const Business = mongoose.model('Business', contactSchema);
const Personal = mongoose.model('Personal', contactSchema);


function dataModels() {
  return [Business, Personal];
}
async function modelSchema(type, contact, req, res) {
  if (type === 'Business'){
    var newContact = new Business(contact);

  }
  else{
    var newContact = new Personal(contact);
  }
  try{
    await newContact.save(function (err) {
      if (!err){
        console.log('Document Saved');
        res.redirect('/');
        }
    });
  }
  catch(e){
    console.log(e);
  }
}
module.exports = {dataModels, modelSchema}
