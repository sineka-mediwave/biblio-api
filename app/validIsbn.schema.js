const Joi = require("joi");

const validIsbn = (value, helpers) => {
  let n = value.length;
  if (n != 10) return helpers.message("isbn should be 10 characters long");
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = value[i] - "0";
    if (0 > digit || 9 < digit)
      return helpers.message("first 9 characters should be numbers");
    sum += digit * (10 - i);
  }
  // Checking last digit.
  let last = value[9];
  if (last != "X" && (last < "0" || last > "9"))
    return helpers.message("last digit should be X");

  // If last digit is 'X', add 10
  // to sum, else add its value.
  sum += last == "X" ? 10 : last - "0";

  // Return true if weighted sum
  // of digits is divisible by 11.
  if (sum % 11 == 0) {
    return true;
  }
  return helpers.message("Invalid isbn");
};

module.exports = validIsbn;
