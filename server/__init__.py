"""Jackpot package initializer."""
import flask

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name

# app.config.from_object('server.config')

from server.server import create_link_token, get_access_token, get_holdings, get_investment_returns  # noqa: E402  pylint: disable=wrong-import-position
