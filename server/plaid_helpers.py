# Plaid imports
import plaid
from plaid.api import plaid_api
from plaid.model.investments_holdings_get_request import InvestmentsHoldingsGetRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.investments_transactions_get_request import InvestmentsTransactionsGetRequest
from plaid.exceptions import ApiException

# Other imports
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import dateutil.relativedelta

load_dotenv()

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
        return response.to_dict()
    except ApiException as e:
        raise Exception(f"Error creating link token: {str(e)}")


def get_access_token(public_token):
    global access_token
    global item_id
    
    try:
        exchange_request = ItemPublicTokenExchangeRequest(
            public_token=public_token)
        exchange_response = client.item_public_token_exchange(exchange_request)
        access_token = exchange_response['access_token']
        item_id = exchange_response['item_id']
        return exchange_response.to_dict()
    except plaid.ApiException as e:
        return json.loads(e.body)

def get_holdings(access_token):
    try:
        holdings_request = InvestmentsHoldingsGetRequest(access_token=access_token)
        holdings_response = client.investments_holdings_get(holdings_request)
        
        holdings = [holding.to_dict() for holding in holdings_response['holdings']]
        securities = {security['security_id']: security.to_dict() for security in holdings_response['securities']}
        
        for holding in holdings:
            holding['security'] = securities.get(holding['security_id'])
            ticker = holding['security']['ticker_symbol']
            asset_id_type = 'symbol'  # assuming NASDAQ symbols
            logo_url = f'https://assets.parqet.com/logos/{asset_id_type}/{ticker}?format=png'
            holding['image'] = logo_url
        
        filtered_holdings = [
            holding for holding in holdings 
            if holding['security']['type'] in ['mutual fund','equity']
        ]
        
        sorted_holdings = sorted(filtered_holdings, key=lambda x: x['institution_value'], reverse=True)
        top_holdings = sorted_holdings[:5]
        
        return {
            'holdings': sorted_holdings,
            'top_holdings': top_holdings,
            'securities': list(securities.values())
        }
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
