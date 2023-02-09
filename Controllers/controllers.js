const middleware = require('../middleware/middleware');
const modelPackage = require('../models/models');
const mongoose = require('mongoose')


const Contacts = modelPackage.dataModels();
let cache = []


const getAllContacts = middleware.asyncWrapper(async (req, res, next)=>{
  if(!cache.length){
    let docs = await Contacts.find({});
    cache = docs;
  }
  let type = req.params.contact;
  console.log(type);
  if(type==="allContact"){
    res.render('index',{contacts:cache})
  }else{
    if(type==="business"){
      type=true
    }else{
      type=false
    }
    let diff = cache.filter(el=>el.isBusiness==type)
    console.log(diff);
    res.render('index', {contacts:diff})
  }
})

const saveContact = middleware.asyncWrapper(async (req, res, next)=>{
  let isBusniess = false
  if (req.body.type === 'Business'){
    isBusniess = true
  }
  let contact = {
    name : req.body.name,
    contactNumber : req.body.number,
    email : req.body.email,
    isBusniess : isBusniess
  }

  await Contacts.collection.insertOne(contact)
  cache.push(contact)
  console.log(contact);
  res.redirect('/')
})

const getContact = middleware.asyncWrapper(async (req, res, next)=>{
  
  let doc = cache.find(el=>el._id == req.params._id)
  if (doc.isBusiness){
    doc.isBusiness = "Business"
  }else{
    doc.isBusiness = "Personal"
  }

  if (doc.length === 0){
    res.status(404).json({msd: 'Contact Not Found'})
  }
  res.render('editContact', {
    name:doc.name,
    email:doc.email,
    contactNumber:doc.contactNumber,
    type:doc.isBusiness
  })
});

const updateContact = middleware.asyncWrapper(async (req, res, next) =>{
  let filter = req.params._id
  let patch = {
    name : req.body.name,
    email : req.body.email,
    contactNumber : req.body.number

  }
  let doc = await Contacts.updateOne({filter}, patch, {
    new: true
    // runValidators: true,
    // upsert : true
  });
  next();
});


const deleteContact = middleware.asyncWrapper(async (req, res, next)=>{
  let filter = req.params._id
  let _id = mongoose.Types.ObjectId(filter)
  console.log(_id);

  try {
    await Contacts.findOneAndDelete( {"_id":_id})
  } catch (error) {
    console.log(error.message);  
  }

})

module.exports = {
  getContact,
  updateContact,
  deleteContact,
  saveContact,
  getAllContacts
}
