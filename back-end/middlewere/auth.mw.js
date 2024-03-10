const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).send("Access denied.No token provider");
    return;
  }

  try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    res.status(400).send("Invalid Token");

  }
}


module.exports = {auth}
