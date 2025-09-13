from flask import Blueprint, jsonify
from .firestore import get_available_models

api_bp = Blueprint("api", __name__)

@api_bp.route("/models")
def models():
    models = get_available_models()
    return jsonify(models)

