import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import UserModel from '../models/User.model.js';

dotenv.config(); // Load environment variables from .env file

async function getGoogleOAuthTokens({ code }) {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.CLIENT_ID, 
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.URL,
    grant_type: 'authorization_code',
  };
  console.log("values" ,values)
  try {
    const res = await axios.post(
      url,
      qs.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response.data.error);
    console.log(error, 'Failed to fetch Google OAuth Tokens');
    throw new Error(error.message);
    
  
  }

}

async function getGoogleUser({ id_token, access_token }) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `${id_token} `,
        },
      }
    );
    return res.data;
  } catch (error) {
   console.log(error, 'Error fetching Google user');
    throw new Error(error.message);
  }
}

async function findAndUpdateUser(query, update, options = {}) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export {
  getGoogleOAuthTokens,
  getGoogleUser,
  findAndUpdateUser,
};
