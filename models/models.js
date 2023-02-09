const mongoose = require('mongoose');
const wrap = require('../middleware/middleware');

// Schema

const contactSchema = new mongoose.Schema ({
  name : String,
  contactNumber : String,
  email : String,
  isBusniess : Boolean
});
const Contacts = mongoose.model('Contacts', contactSchema);


function dataModels() {
  return Contacts;
}
async function modelSchema(contact, req, res) {
  let newContact = new Contacts(contact)
  try{
    await newContact.save();
  }
  catch(e){
    console.log(e.message);
  }
}
module.exports = {dataModels, modelSchema}
