import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, email, user_level }) {
  const user = { user_id, email, user_level}; 
  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
  const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });
  return ({ access_token, refresh_token });
}

export {jwtTokens};