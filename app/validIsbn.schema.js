const Joi = require("joi");

const validIsbn = (value, helpers) => {
  let n = value.length;
  if (n != 10) return helpers.error("any.invalid");
};

module.exports = validIsbn;
