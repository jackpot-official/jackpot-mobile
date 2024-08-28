from bs4 import BeautifulSoup
import torch
import requests
import numpy as np
import pandas as pd
from transformers import pipeline
from transformers import AutoTokenizer,AutoModelForSequenceClassification

def getBullishBearishTag(title, body):
    allText = title + " " + body

    model_name = "ProsusAI/finbert"
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    pipe = pipeline("text-classification", model="ProsusAI/finbert")


    res = pipe(allText)

    # Determine if the result is Bullish or Bearish
    if res[0]['label'] == 'positive':
        return "Bullish"
    elif res[0]['label'] == 'negative':
        return "Bearish"
    else:
        return "Neutral"