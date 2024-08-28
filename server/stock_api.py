from dotenv import load_dotenv
import os
import requests
import json


ALPHA_VANTAGE_KEY = os.getenv('ALPHA_VANTAGE_KEY')


def get_ticker_data(ticker):
    url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={ALPHA_VANTAGE_KEY}'
    r = requests.get(url)
    data = r.json()
    
    # { 
    #     "Global Quote": {
    #         "01. symbol": "IBM",
    #         "02. open": "190.2900",
    #         "03. high": "191.3100",
    #         "04. low": "189.2100",
    #         "05. price": "190.9900",
    #         "06. volume": "2178862",
    #         "07. latest trading day": "2024-08-13",
    #         "08. previous close": "189.4800",
    #         "09. change": "1.5100",
    #         "10. change percent": "0.7969%"
    #     }
    # }

    print(data)
    
    quote = {
        "symbol": data["Global Quote"]["01. symbol"],
        "open": data["Global Quote"].get("02. open", "N/A"),
        "high": data["Global Quote"].get("03. high", "N/A"),
        "low": data["Global Quote"].get("04. low", "N/A"),
        "price": data["Global Quote"].get("05. price", "N/A"),
        "volume": data["Global Quote"].get("06. volume", "N/A"),
        "latest_trading_day": data["Global Quote"].get("07. latest trading day", "N/A"),
        "previous_close": data["Global Quote"].get("08. previous close", "N/A"),
        "change": data["Global Quote"].get("09. change", "N/A"),
        "change_percent": data["Global Quote"].get("10. change percent", "N/A")
    }
    
    return json.dumps(quote)
    