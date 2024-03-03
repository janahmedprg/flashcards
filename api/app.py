from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from pymongo import MongoClient
from flask_pymongo import ObjectId
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash 
import os

from middleware.filehandling import generate_set

app = Flask(__name__)

auth = HTTPBasicAuth()

CORS(app)

client = MongoClient(os.environ["MONGO_URI"])

db = client["user-data"]

@auth.verify_password
def verify_password(username, password):
    user = db["users"].find_one({"username": username})
    if user is not None and check_password_hash(user["password"], password):
        return user

# Create user
@app.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = generate_password_hash(request.form["password"], "pbkdf2")

    if db["users"].find_one({"username": username}):
        return make_response("Username already in use", 500)
    else:
        res = db["users"].insert_one({"username": username, "password": password, "sets": []})
        return jsonify(str(res.inserted_id))

@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    user = db["users"].find_one({"username": username})
    if user is not None and check_password_hash(user["password"], password):
        return jsonify(str(user["_id"]))
    else:
        return make_response("Wrong credentials", 403)

@app.route("/login_unity", methods=["POST"])
def login_unity():
    username = request.json["username"]
    password = request.json["password"]
    user = db["users"].find_one({"username": username})
    if user is not None and check_password_hash(user["password"], password):
        return jsonify(str(user["_id"]))
    else:
        return make_response("Wrong credentials", 403)

# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    data = db["users"].find()
    res = [{"_id": str(user["_id"]),"username": user["username"]} for user in data]
    return jsonify(res)

# Get a user
@app.route("/user/<id>", methods=["GET"])
@auth.login_required
def get_user(id):
    if str(auth.current_user()["_id"]) == id:
        user = db["users"].find_one({"_id": ObjectId(id)})
        if user is not None:
            user["_id"] = str(user["_id"])
        else:
            user = {}
        return jsonify(user)
    else:
        return make_response("Unauthorized access", 403)

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
@auth.login_required
def get_user_sets(id):
    if str(auth.current_user()["_id"]) == id:
        if request.method == "GET":
            data = db["sets"].find({"owner_id": ObjectId(id)})
            res = [{"set_name": set["set_name"], "flashcards": set["flashcards"]} for set in data]
            return jsonify(res)
        else:
            uploaded_file = request.files["upload"]
            card_set = generate_set(uploaded_file)

            if not card_set:
                return make_response("Not enough information to make cards from", 400)
            
            res = db["sets"].insert_one({"owner_id": ObjectId(id), "set_name": request.form["set_name"], "flashcards": card_set})
            db["users"].update_one({"_id": ObjectId(id)}, {"$push": {"sets": ObjectId(res.inserted_id)}})
            return card_set
    else:
        return make_response("Unauthorized access", 403)
