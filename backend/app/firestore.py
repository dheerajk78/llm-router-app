from google.cloud import firestore

db = firestore.Client()
COLLECTION = "apices"

def get_available_models():
    docs = db.collection(COLLECTION).where("is_active", "==", True).stream()
    return [_doc_to_dict(doc) for doc in docs]

def get_all_models():
    docs = db.collection(COLLECTION).stream()
    return [_doc_to_dict(doc) for doc in docs]

def create_model(data):
    doc_ref = db.collection(COLLECTION).document()
    doc_ref.set(data)
    return {"id": doc_ref.id, **data}

def update_model(doc_id, data):
    doc_ref = db.collection(COLLECTION).document(doc_id)
    doc_ref.update(data)
    return {"id": doc_id, **data}

def delete_model(doc_id):
    db.collection(COLLECTION).document(doc_id).delete()
    return {"id": doc_id, "deleted": True}

def _doc_to_dict(doc):
    d = doc.to_dict()
    d["id"] = doc.id
    return d
