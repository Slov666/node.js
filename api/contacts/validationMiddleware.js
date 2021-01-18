const joi = require("joi");

module.exports.addContactValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
    subsctiption: joi.string().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    token: joi.string(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({ message: value.error });
  }
  next();
};

module.exports.updateContactValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
    subsctiption: joi.string().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({ message: value.error });
  }
  next();
};
