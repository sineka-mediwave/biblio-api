const Joi = require("joi");
const validIsbn = require("../validIsbn.schema");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  isbn: Joi.string().custom(validIsbn, "custom").required(),
});
// .custom(validIsbn, "custom")
module.exports = {
  bookSchema,
};
