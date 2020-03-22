const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const set = require('lodash/set');

const checkSchema = (req, schemaObj) => {
  const fields = Object.keys(schemaObj).map(i => i)

  let error = {};
  fields.forEach(key => {
    const schema = schemaObj[key];
    const result = Joi.validate(req[key], schema, { abortEarly: false });

    if (result.error) {
      result.error.details.forEach(value => {
        set(error, value.path, value.message);
      })
    }
  });

  if (!isEmpty(error)) return error

  return null;
};

module.exports = function validate(schemaFunc) {
  return (req, res, next) => {
    const schema = schemaFunc(Joi)

    const result = checkSchema(req, schema);
    if (result) {
      return res.status(400).send({ errors: result });
    }
    return next();
  }
};
