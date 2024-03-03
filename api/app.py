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


@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    # Save the file to MongoDB or perform any other necessary actions
    # Example:
    file.save(file.filename)
    return "File uploaded successfully", 200

if __name__ == "__main__":
    app.run(debug=True)







