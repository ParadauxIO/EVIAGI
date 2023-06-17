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