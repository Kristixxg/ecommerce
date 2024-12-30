import jwt from "jsonwebtoken";

const jwtValidation = (req, res, next) => {
  // get token from header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // decode token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded.id) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  // assign data inside the token to the request body so that we can directly access these data in the request object in the route handler functions
  req.body.userId = decoded.id;
  req.body.username = decoded.username;

  next();
};

export default jwtValidation;
