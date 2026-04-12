from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


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
def save_profile():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    if not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and email are required"}), 400

    # Single-user MVP approach:
    users_collection.delete_many({})  # remove existing profile
    users_collection.insert_one(data)

    return jsonify({"message": "Profile saved"}), 201


@app.route("/api/profile", methods=["GET"])
def get_profile():
    user = users_collection.find_one()

    if not user:
        return jsonify({}), 200

    user["_id"] = str(user["_id"])
    return jsonify(user)







if __name__ == '__main__':
    app.run(debug=True)