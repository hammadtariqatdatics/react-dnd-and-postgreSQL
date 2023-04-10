const Joi = require("joi");

const createUserSchema = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(25).required("Name is required..."),
    email: Joi.string().email().required("Email is required..."),
    phone: Joi.number()
      .positive()
      .min(15)
      .required("Phone number is required..."),
    position: Joi.number().positive().required("Position is required..."),
  });

  return schema.validate(user);
};

module.exports = { createUserSchema };
