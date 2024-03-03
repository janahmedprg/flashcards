from flask import Flask, request
from flask_cors import CORS
import json

from models import generate_flashcards

app = Flask(__name__)
CORS(app)

@app.route("/test")
def test():
    return {"Test": "bruh"}

@app.route("/generate", methods=["POST"])
def generate():
    cards = json.loads(generate_flashcards(request.form["notes"]))
    return cards