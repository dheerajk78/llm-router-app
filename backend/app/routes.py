
from flask import Blueprint, jsonify, request
from .firestore import (
    get_available_models, get_all_models,
    create_model, update_model, delete_model
)

api_bp = Blueprint("api", __name__)

@api_bp.route("/models", methods=["GET"])
def models():
    models = get_available_models()
    return jsonify(models)

@api_bp.route("/models/all", methods=["GET"])
def models_all():
    models = get_all_models()
    return jsonify(models)

@api_bp.route("/models", methods=["POST"])
def add_model():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    model = create_model(data)
    return jsonify(model), 201

@api_bp.route("/models/<doc_id>", methods=["PUT"])
def update_model_route(doc_id):
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    model = update_model(doc_id, data)
    return jsonify(model)

@api_bp.route("/models/<doc_id>", methods=["DELETE"])
def delete_model_route(doc_id):
    result = delete_model(doc_id)
    return jsonify(result)
