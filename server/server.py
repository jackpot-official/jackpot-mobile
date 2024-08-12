from flask import Flask, request, jsonify
from plaid_helpers import (
    create_link_token,
    get_access_token,
    get_holdings,
    get_investment_returns
)


app = Flask(__name__)


@app.route('/create_link_token', methods=['POST'])
def create_link_token_route():
    try:
        response = create_link_token()
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/set_access_token', methods=['POST'])
def set_access_token_route():
    data = request.json
    public_token = data.get('public_token')
    try:
        response = get_access_token(public_token)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/investments/holdings/get', methods=['POST'])
def get_holdings_route():
    data = request.get_json()
    access_token = data['access_token']
    try:
        response = get_holdings(access_token)
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

            
if __name__ == '__main__':
    app.run(port=3000, debug=True)
