# from server import app
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import dateutil.relativedelta


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
from plaid.model.investments_transactions_get_request import InvestmentsTransactionsGetRequest


load_dotenv()


app = Flask(__name__)


PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_ENV = plaid.Environment.Sandbox if os.getenv('PLAID_ENV') == 'sandbox' else plaid.Environment.Production
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'investments').split(',')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US').split(',')
API_NINJAS_KEY=os.getenv('API_NINJAS_KEY')


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
        
        # holdings = [holding.to_dict() for holding in holdings_response['holdings']]
        # securities = [security.to_dict() for security in holdings_response['securities']]
        
        holdings = [holding.to_dict() for holding in holdings_response['holdings']]
        securities = {security['security_id']: security.to_dict() for security in holdings_response['securities']}
        
        for holding in holdings:
            holding['security'] = securities.get(holding['security_id'])
        
        filtered_holdings = [
            holding for holding in holdings 
            if holding['security']['type'] in ['mutual fund','equity']
        ]
        
        top_holdings = sorted(filtered_holdings, key=lambda x: x['institution_value'], reverse=True)[:5]

        # top_holdings = sorted(holdings, key=lambda x: x['institution_value'], reverse=True)[:5]
        
        for holding in top_holdings:
            ticker = holding['security']['ticker_symbol']
            # if ticker == 'GOOGL':
            #     ticker = 'GOOG'
            asset_id_type = 'symbol'  # Assuming we are using NASDAQ symbols for this example
            logo_url = f'https://assets.parqet.com/logos/{asset_id_type}/{ticker}?format=png'
            holding['image'] = logo_url
            # logo_url = f'https://api.api-ninjas.com/v1/logo?ticker={ticker}'
            # headers = {'X-Api-Key': API_NINJAS_KEY}
            # response = requests.get(logo_url, headers=headers)
            # if response.status_code == 200:
            #     logo_data = response.json()
            #     if logo_data:
            #         holding['image'] = logo_data[0]['image']
            #     else:
            #         holding['image'] = None
            # else:
            #     holding['image'] = None
        
        return jsonify({
            'holdings': holdings,
            'top_holdings': top_holdings,
            'securities': list(securities.values())
        })
    except ApiException as e:
        return jsonify({'error': str(e)}), 400


def calculate_percent_return(transactions):
    buy_total = 0
    sell_total = 0
    for transaction in transactions:
        transaction_type = str(transaction['type'])
        amount = transaction['amount']
        if transaction_type == 'buy':
            buy_total += amount
        elif transaction_type == 'sell':
            sell_total += amount
    if buy_total == 0:
        return 0
    return (sell_total - buy_total) / buy_total * 100


def calculate_returns(transactions):
    total = 0
    gain = 0
    loss = 0
    for transaction in transactions:
        transaction_type = str(transaction['type'])
        amount = transaction['amount']
        if transaction_type == 'sell':
            total += amount
            gain += amount
        elif transaction_type == 'buy':
            total -= amount
            loss -= amount
        elif transaction_type == 'cash' or transaction_type == 'dividend':
            total += amount
            gain += amount
            
        
    percent_return = calculate_percent_return(transactions)
    return total, percent_return


@app.route('/investments/returns/get', methods=['POST'])
def get_investment_returns():
    data = request.get_json()
    access_token = data['access_token']

    def fetch_investment_transactions(start_date, end_date):
        try:
            transactions_request = InvestmentsTransactionsGetRequest(
                access_token=access_token,
                start_date=datetime.strptime(start_date, '%Y-%m-%d').date(),
                end_date=datetime.strptime(end_date, '%Y-%m-%d').date()
            )
            transactions_response = client.investments_transactions_get(transactions_request)
            # print(transactions_response)
            return transactions_response['investment_transactions']
        except ApiException as e:
            return jsonify({'error': str(e)}), 400

    now = datetime.now()
    periods = {
        'Today': (now - timedelta(days=1)).strftime('%Y-%m-%d'),
        '5D': (now - timedelta(days=5)).strftime('%Y-%m-%d'),
        '1M': (now - dateutil.relativedelta.relativedelta(months=1)).strftime('%Y-%m-%d'),
        '3M': (now - dateutil.relativedelta.relativedelta(months=3)).strftime('%Y-%m-%d'),
        'YTD': datetime(now.year, 1, 1).strftime('%Y-%m-%d'),
        '1Y': (now - dateutil.relativedelta.relativedelta(years=1)).strftime('%Y-%m-%d'),
        '5Y': (now - dateutil.relativedelta.relativedelta(years=5)).strftime('%Y-%m-%d')
    }

    returns_data = {}
    end_date = datetime.now().strftime('%Y-%m-%d')

    for period, start_date in periods.items():
        transactions = fetch_investment_transactions(start_date, end_date)
        if 'error' in transactions:
            return transactions
        returns, percent_return = calculate_returns(transactions)
        returns_data[period] = {
            'absolute_return': returns,
            'percent_return': percent_return
        }

    return jsonify(returns_data)
            
            
if __name__ == '__main__':
    app.run(port=3000, debug=True)
