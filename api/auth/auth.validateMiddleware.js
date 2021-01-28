const joi = require("joi");

module.exports.authValidateMiddleware = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({ message: value.error });
  }
  next();
};
