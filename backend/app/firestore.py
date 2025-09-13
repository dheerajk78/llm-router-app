from google.cloud import firestore

def get_available_models():
    db = firestore.Client()
    apikeys_ref = db.collection("apices")
    docs = apikeys_ref.where("is_active", "==", True).stream()

    models = []
    for doc in docs:
        data = doc.to_dict()
        models.append({
            "provider": data["provider"],
            "model": data["model"]
        })
    
    return models

