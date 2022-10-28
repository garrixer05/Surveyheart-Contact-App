// All the routes
const modelPackage = require('../models/models');
const middleware = require('../middleware/middleware');
const controller = require('../Controllers/controllers')


const a = modelPackage.dataModels();
let B = a[0];
let P = a[1];
module.exports = function (app) {
  app.get('/',function (req, res) {
    res.redirect('/api/v1/allContact')
    // res.render('index', {contacts : []});
  });

  app.get('/api/v1/:contact', async function (req, res) {
    try {
      const contacts1 = await B.find({}, 'name');
      const contacts2 = await P.find({}, 'name');

      if (req.params.contact === 'allContact'){
        res.render('index', { contacts:middleware.getAllContacts(contacts1.concat(contacts2)) });
      }
      else if (req.params.contact === 'personal') {
        res.render('index', { contacts:middleware.getAllContacts(contacts2) });
      }
      else if (req.params.contact === 'business') {
        res.render('index', { contacts:middleware.getAllContacts(contacts1) });
      }
    } catch (e) {
      res.status(500).json({msg : e})
    }
  });











  // app.delete('/api/v1/:contact'){





  app.post('/api/v1/:contact', function (req, res) {
    var type = req.body.type;
    var contact = {
      name : req.body.name,
      contactNumber : req.body.number,
      email : req.body.email
    }
    console.log(contact);

    modelPackage.modelSchema(type, contact, req, res);
  });

  app.get('/api/v1/:contact/:_id', controller.getContact).put('/api/v1/:contact/:_id', controller.updateContact)
}
