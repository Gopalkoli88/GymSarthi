const { body, validationResult } = require("express-validator");

const validatesSignup = [
  body("name").isString().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    // ye sare validation signup me hone chaiye
    // validataionResult - collects error generate by expressValidator, collects error in array
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatesLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").exists().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // middleware must add at end next()
    next();
  },
];

module.exports = {
  validatesSignup,
  validatesLogin,
};
