const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "ar344dd34dd!3xz4"
function generateAccessToken() {
    console.log("Start token");

    const token = jwt.sign( {
        userId: "testUser"
    }, TOKEN_SECRET, { expiresIn: '3600s' });
    console.log(token);
    return token;
  }

  function authenticateToken(token) {
    console.log("start authenticateToken");
    console.log(token);
    if (token == null)  return false;
    token = token.replace("Bearer ","");
    return jwt.verify(token,  TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return false;
      console.log(user);
      return true;
    })
  }
module.exports = { generateAccessToken, authenticateToken}
