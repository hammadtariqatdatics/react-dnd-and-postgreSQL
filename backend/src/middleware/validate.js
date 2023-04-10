const { createUserSchema } = require("../routes/users/validationSchema");

const validateUserRequestHandler = (req, res, next) => {
  const payload = req.body;
  // Validate request
  const validatePayload = createUserSchema(payload);
  const { error } = validatePayload;
  if (error) {
    return res.status(400).send({ message: error.message });
  } else {
    next();
  }
};

module.exports = {
  validateUserRequestHandler,
};
