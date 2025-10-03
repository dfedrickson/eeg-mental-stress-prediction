from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import numpy as np
import pickle
import json
from utils.preprocessing import preprocess_eeg, extract_features
from utils.lime_explainer import explain_prediction

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained ANFIS model
with open("models/anfis_model.pkl", "rb") as f:
    anfis_model = pickle.load(f)

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    channels: str = Form(None),
    preprocessing: str = Form(None)
):
    # Save uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(filepath, "wb") as f:
        f.write(await file.read())

    # Parse channels and preprocessing options
    selected_channels = json.loads(channels) if channels else None
    preprocessing_options = json.loads(preprocessing) if preprocessing else {}

    # Preprocess EEG & extract features
    eeg_data = preprocess_eeg(filepath, channels=selected_channels, **preprocessing_options)
    features = extract_features(eeg_data, channels=selected_channels)

    # ANFIS prediction
    prediction = float(anfis_model.predict(np.array([features]))[0])

    # LIME explanation
    explanation = explain_prediction(anfis_model, features)

    return {
        "level": prediction,
        "features": features.tolist() if isinstance(features, np.ndarray) else features,
        "explanation": explanation
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
