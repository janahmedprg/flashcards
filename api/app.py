from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_pymongo import ObjectId
import os

from middleware.filehandling import generate_set

app = Flask(__name__)

CORS(app)

client = MongoClient(os.environ["MONGO_URI"])

db = client["user-data"]

# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    data = db["users"].find()
    res = [{"_id": str(user["_id"]),"username": user["username"]} for user in data]
    return jsonify(res)

# Get a user
@app.route("/user/<id>", methods=["GET"])
def get_user(id):
    user = db["users"].find_one({"_id": ObjectId(id)})
    if user is not None:
        user["_id"] = str(user["_id"])
    else:
        user = {}
    return jsonify(user)

# Get a user's flashcard sets
@app.route("/sets")
def get_sets():
    data = db["sets"].find()
    res = [{"set_name": set["set_name"], "flashcards": set["flashcards"]} for set in data]
    return jsonify(res)

@app.route("/sets/<id>")
def get_set(id):
    set = db["sets"].find_one({"_id": ObjectId(id)})
    if set is not None:
        return jsonify(set)
    else:
        return jsonify({})
    
@app.route("/user/<id>/sets", methods=["GET", "POST"])
def get_user_sets(id):
    if request.method == "GET":
        data = db["sets"].find({"owner_id": ObjectId(id)})
        res = [{"set_name": set["set_name"], "flashcards": set["flashcards"]} for set in data]
        return jsonify(res)
    else:
        uploaded_file = request.files["upload"]
        card_set = generate_set(uploaded_file)

        if not card_set:
            return {"Error": "Not enough information to make cards from"}
        
        res = db["sets"].insert_one({"owner_id": ObjectId(id), "set_name": request.form["set_name"], "flashcards": card_set})
        db["users"].update_one({"_id": ObjectId(id)}, {"$push": {"sets": ObjectId(res.inserted_id)}})
        return card_set
