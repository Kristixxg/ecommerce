import validator from "validator";

const createUserValidation = (req, res, next) => {
  const { username, password } = req.body;
  console.log("here", username, password);
  if (
    !username ||
    !password ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: "Username must be alphanumeric!" });
  }

  next();
};

const loginUserValidation = (req, res, next) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    validator.isEmpty(username) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: "Username must be alphanumeric!" });
  }

  next();
};

export { createUserValidation, loginUserValidation };
