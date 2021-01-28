const joi = require("joi");

module.exports.updateMiddleware = (req, res, next) => {
  const schema = joi.object({
    subscription: joi.string().valid("free", "pro", "premium").required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.status(400).json({ message: value.error });
  }
  next();
};
