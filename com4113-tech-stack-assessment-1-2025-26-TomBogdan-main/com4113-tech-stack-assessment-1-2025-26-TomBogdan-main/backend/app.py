from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash



app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])



client = MongoClient(
    "mongodb+srv://TomAdmin1:ZccK4WAFGFJO8hxH@cluster0.j5n43.mongodb.net/?appName=Cluster0"
)


db = client["skill_swap_db"]
resources_collection = db["resources"]
users_collection = db["users"]


@app.route('/api/test')
def api_test():
    return jsonify({
        "status": "success",
        "message": "Flask API is working"
    })



@app.route("/api/resources", methods=["POST"])
def create_resource():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    if not data.get("title") or not data.get("category"):
        return jsonify({"error": "Title and category are required"}), 400

    resources_collection.insert_one(data)
    return jsonify({"message": "Resource saved"}), 201

@app.route("/api/resources", methods=["GET"])
def get_resources():
    resources = list(resources_collection.find())

    for r in resources:
        r["_id"] = str(r["_id"])

    return jsonify(resources)


@app.route("/api/profile", methods=["POST"])
def create_or_update_profile():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    # ✅ HASH PASSWORD
    hashed_password = generate_password_hash(data["password"])

    user_data = {
        "name": data.get("name"),
        "email": data.get("email"),
        "password": hashed_password,  # ✅ store hash only
        "avatar": data.get("avatar"),
        "pronouns": data.get("pronouns"),
        "phone": data.get("phone")
    }

    db.users.update_one(
        {"email": data["email"]},
        {"$set": user_data},
        upsert=True
    )

    return jsonify({"message": "Profile saved securely"}), 200




    


@app.route("/api/profile", methods=["GET"])
def get_profile():
    email = request.args.get("email")

    if not email:
        return jsonify({}), 400

    user = db.users.find_one(
        {"email": email},
        {"_id": 0, "password": 0}
    )

    return jsonify(user or {})


@app.route("/api/bookmark", methods=["POST"])
def bookmark_resource():
    data = request.json

    email = data.get("email")
    resource_id = data.get("resource_id")

    if not email or not resource_id:
        return jsonify({"error": "Missing data"}), 400

    db.users.update_one(
        {"email": email},
        {"$addToSet": {"bookmarks": resource_id}}  # prevent duplicates
    )

    return jsonify({"message": "Resource bookmarked"}), 200


@app.route("/api/bookmarks", methods=["GET"])
def get_bookmarks():
    email = request.args.get("email")

    if not email:
        return jsonify([])

    user = db.users.find_one({"email": email})

    if not user or "bookmarks" not in user:
        return jsonify([])

    resources = list(
        db.resources.find(
            {"_id": {"$in": user["bookmarks"]}},
            {"_id": 0}
        )
    )

    return jsonify(resources)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    user = db.users.find_one({"email": data["email"]})

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    # ✅ Compare hashed password
    if check_password_hash(user["password"], data["password"]):
        return jsonify({
            "message": "Login successful",
            "email": user["email"]
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/auth-check", methods=["GET"])
def auth_check():
    email = request.args.get("email")

    if not email:
        return jsonify({"authenticated": False}), 401

    user = db.users.find_one({"email": email})

    if user:
        return jsonify({"authenticated": True}), 200

    return jsonify({"authenticated": False}), 401

print(app.url_map)

if __name__ == '__main__':
    app.run(debug=True)