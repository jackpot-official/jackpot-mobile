from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

import plaid
from plaid.api import plaid_api
from plaid.model.investments_holdings_get_request import InvestmentsHoldingsGetRequest
from plaid.model.plaid_error import PlaidError
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.exceptions import ApiException


load_dotenv()


app = Flask(__name__)


PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_ENV = plaid.Environment.Sandbox if os.getenv('PLAID_ENV') == 'sandbox' else plaid.Environment.Production
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'investments').split(',')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US').split(',')


client = plaid_api.PlaidApi(plaid.ApiClient(
    plaid.Configuration(
        host=PLAID_ENV,
        api_key={
            'clientId': PLAID_CLIENT_ID,
            'secret': PLAID_SECRET,
        }
    )
))


@app.route('/create_link_token', methods=['POST'])
def create_link_token():
    try:
        request_data = LinkTokenCreateRequest(
            products=[Products(product) for product in PLAID_PRODUCTS],
            client_name="Jackpot",
            country_codes=[CountryCode(code) for code in PLAID_COUNTRY_CODES],
            language='en',
            user=LinkTokenCreateRequestUser(
                client_user_id='1'
            ),
            webhook='https://sample-web-hook.com',
            redirect_uri='https://secure.plaid.com/oauth/redirect'
        )
        response = client.link_token_create(request_data)
        return jsonify(response.to_dict())
    except ApiException as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/set_access_token', methods=['POST'])
def get_access_token():
    global access_token
    global item_id
    data = request.json
    public_token = data.get('public_token')

    try:
        exchange_request = ItemPublicTokenExchangeRequest(
            public_token=public_token)
        exchange_response = client.item_public_token_exchange(exchange_request)
        access_token = exchange_response['access_token']
        print(access_token)
        item_id = exchange_response['item_id']
        return jsonify(exchange_response.to_dict())
    except plaid.ApiException as e:
        return json.loads(e.body)


@app.route('/investments/holdings/get', methods=['POST'])
def get_holdings():
    data = request.get_json()
    access_token = data['access_token']
    
    try:
        holdings_request = InvestmentsHoldingsGetRequest(access_token=access_token)
        holdings_response = client.investments_holdings_get(holdings_request)
        
        holdings = [holding.to_dict() for holding in holdings_response['holdings']]
        securities = [security.to_dict() for security in holdings_response['securities']]
        
        
        return jsonify({
            'holdings': holdings,
            'securities': securities
        })
    except ApiException as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(port=3000, debug=True)
