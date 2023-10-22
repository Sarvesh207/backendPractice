// let flag = false;  // user is loggedIn

function protectedRoute(req, res, next){
    if(req.cookies.isLoggedIn){
      next();
    } else {
      return res.json({
        message: "user is not loggedIn operatio is not allowed "
      })
    }
  }

  module.exports = protectedRoute;