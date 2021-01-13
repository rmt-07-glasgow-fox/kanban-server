const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_GOOGLE);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_GOOGLE,  
  }); 
  const payload = ticket.getPayload();

  return payload
}

module.exports = verify