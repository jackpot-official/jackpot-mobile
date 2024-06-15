from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

@app.route('/create_link_token', methods=['POST'])
def create_link_token():
    try:
        req_data = {
            "client_id": os.getenv('PLAID_CLIENT_ID'),
            "secret": os.getenv('PLAID_SECRET'),
            "user": {
                "client_user_id": "1",
                "email_address": "riyadev@umich.edu"
            },
            "products": ["investments"],
            "client_name": "Jackpot",
            "language": "en",
            "country_codes": ["US"],
            "webhook": "https://sample-web-hook.com",
            "redirect_uri": "https://secure.plaid.com/oauth/redirect"
        }

        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.post('https://sandbox.plaid.com/link/token/create', json=req_data, headers=headers)
        response_data = response.json()

        if response.status_code != 200:
            return jsonify({"error": "Error creating link token"}), 500

        return jsonify({"link_token": response_data['link_token']})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Error creating link token"}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
