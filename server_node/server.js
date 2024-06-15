const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/create_link_token', async (req, res) => {
  try {
    const request = {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      user: {
        client_user_id: '1',
        email_address: 'riyadev@umich.edu'
      },
      products: ['investments'],
      client_name: 'Jackpot',
      language: 'en',
      country_codes: ['US'],
      webhook: 'https://sample-web-hook.com',
      redirect_uri: 'https://secure.plaid.com/oauth/redirect'
    };

    const response = await axios.post('https://sandbox.plaid.com/link/token/create', request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).send('Error creating link token');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
