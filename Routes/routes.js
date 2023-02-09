// All the routes
const modelPackage = require('../models/models');
const middleware = require('../middleware/middleware');
const controller = require('../Controllers/controllers')


const Contact = modelPackage.dataModels();

module.exports = function (app) {
  app.get('/',function (req, res) {
    res.redirect('/api/v1/allContact')
    
  });

  app.get('/api/v1/:contact', controller.getAllContacts).post('/api/v1/:contact', controller.saveContact);
  app.get('/api/v1/:contact/:_id', controller.getContact).put('/api/v1/:contact/:_id', controller.updateContact).delete('/api/v1/:contact/:_id', controller.deleteContact)
}
