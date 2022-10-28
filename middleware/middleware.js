const modelSchema  = require('../models/models');

function getAllContacts(doc) {
  // console.log(doc);
  let a = [];
  let c = {}
  doc.forEach((item) => {
    c = {
      name : item.name,
      _id : item._id.toString()
    }
    // console.log(c);
    a.push(c);
  });
  // console.log(a);
  return a;

}
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
async function documenting() {
  const a = modelSchema.dataModels();
  let B = a[0];
  let P = a[1];
  let res = []
  const result = asyncWrapper()

  try {
    const contacts1 = await B.find({});
    const contacts2 = await P.find({});
    console.log(contacts1, contacts2);

  }catch (e) {
      console.log(e);
  }
  finally {
    return res

  }
}

module.exports = { getAllContacts, documenting, asyncWrapper }
