from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd

app = Flask(__name__)

# Mock data for demonstration purposes
media_sources = pd.DataFrame([
    {"name": "CNBC", "description": "Financial news, stock market updates, economic analysis"},
    {"name": "Bloomberg", "description": "Global business and financial news, stock quotes, company performance"},
    {"name": "Wall Street Journal", "description": "Business and financial news, economic insights, market trends"},
    {"name": "TechCrunch", "description": "Technology news, startup information, gadget reviews"},
    {"name": "The Motley Fool", "description": "Investment advice, stock recommendations, financial planning"},
])

tickers = pd.DataFrame([
    {"symbol": "AAPL", "description": "Technology company, consumer electronics, software"},
    {"symbol": "GOOGL", "description": "Technology company, search engine, cloud computing"},
    {"symbol": "MSFT", "description": "Technology company, software, cloud services"},
    {"symbol": "AMZN", "description": "E-commerce, cloud computing, artificial intelligence"},
    {"symbol": "JPM", "description": "Financial services, banking, investment banking"},
    {"symbol": "JNJ", "description": "Healthcare, pharmaceuticals, medical devices"},
])

# Preprocess the data
vectorizer = TfidfVectorizer(stop_words='english')
media_vectors = vectorizer.fit_transform(media_sources['description'])
ticker_vectors = vectorizer.transform(tickers['description'])

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    persona = data.get('persona', '')
    portfolio = data.get('portfolio', [])

    # Create a vector for the user's persona
    user_vector = vectorizer.transform([persona])

    # Calculate similarity scores
    media_scores = cosine_similarity(user_vector, media_vectors).flatten()
    ticker_scores = cosine_similarity(user_vector, ticker_vectors).flatten()

    # Get top 3 media recommendations
    media_indices = media_scores.argsort()[-3:][::-1]
    recommended_media = media_sources.iloc[media_indices]['name'].tolist()

    # Get top 5 ticker recommendations, excluding those already in portfolio
    ticker_indices = ticker_scores.argsort()[::-1]
    recommended_tickers = []
    for idx in ticker_indices:
        symbol = tickers.iloc[idx]['symbol']
        if symbol not in portfolio:
            recommended_tickers.append(symbol)
        if len(recommended_tickers) == 5:
            break

    return jsonify({
        "recommended_media": recommended_media,
        "recommended_tickers": recommended_tickers
    })

if __name__ == '__main__':
    app.run(debug=True)

