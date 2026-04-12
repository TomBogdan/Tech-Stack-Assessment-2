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



if __name__ == '__main__':
    app.run(debug=True)