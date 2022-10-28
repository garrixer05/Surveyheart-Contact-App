const middleware = require('../middleware/middleware');
const modelPackage = require('../models/models');

const a = modelPackage.dataModels();
const B = a[0];
const P = a[1];




const getContact = middleware.asyncWrapper(async (req, res, next)=>{

  const doc = {
    a:await B.findOne({_id: req.params._id}),
    b:await P.findOne({_id: req.params._id})
  }
  if (doc.length === 0){
    res.status(404).json({msd: 'Contact Not Found'})
  }
  if (doc.a){
    res.render('editContact', {
      name: doc.a.name,
      email:doc.a.email,
      contactNumber: doc.a.contactNumber,
      type : 'Business'
    });
  }else{
    res.render('editContact', {
      name: doc.b.name,
      email:doc.b.email,
      contactNumber: doc.b.contactNumber,
      type: 'Personal'
    });
  }
});

const updateContact = middleware.asyncWrapper(async (req, res, next) =>{
  let filter = req.params._id
  let patch = {
    name : req.body.name,
    email : req.body.email,
    contactNumber : req.body.number

  }
  console.log(patch);
  let doc = await B.updateOne({filter}, patch, {
    new: true
    // runValidators: true,
    // upsert : true
  });
  next();
  // res.redirect('/api/v1/allContact/'+filter)

});

module.exports = {
  getContact,
  updateContact
}
