const jwt = require("jsonwebtoken")


const authenticate = (req, res, next) => {
    // Check if the user is authenticated
    // For example, you can check if a user session exists or if the request contains valid authentication credentials
    if (req.isAuthenticated()) {
      // User is authenticated, allow access to the next middleware or route handler
      return next();
    }
  
    // User is not authenticated, redirect to the login page or send an error response
    res.redirect('/login');
};

const authenticateUserMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = {authenticateUserMiddleware}