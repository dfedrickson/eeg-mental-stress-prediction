import os
import json
import joblib
import pandas as pd
import numpy as np
from utils.preprocessing import preprocess_eeg
from utils.features import extract_features
from models.neurofuzzy import ANFISModel
from sklearn.model_selection import train_test_split

MODEL_DIR = "models"
RESULTS_DIR = "results"
os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

def get_all_csvs(folder):
    """Recursively get all CSV files in subfolders"""
    csv_files = []
    for root, _, files in os.walk(folder):
        for f in files:
            if f.endswith(".csv"):
                csv_files.append(os.path.join(root, f))
    return csv_files

def train_model(condition_dir, control_dir, selected_channels, preprocessing_options,
                window_size=256, step_size=128, test_size=0.2):
    """
    Train EEG model from SAM-40 dataset with subfolders.
    Includes train/test split and reports training & testing accuracy.
    """
    X_list = []
    y_list = []

    # Condition (stress) files
    condition_files = get_all_csvs(condition_dir)
    for fpath in condition_files:
        df = pd.read_csv(fpath)
        data = preprocess_eeg(df, channels=selected_channels, **preprocessing_options)
        X, _ = extract_features(data, labels=1, window_size=window_size, step_size=step_size)
        X_list.append(X)
        y_list.append(np.ones(X.shape[0]))

    # Control (relax) files
    control_files = get_all_csvs(control_dir)
    for fpath in control_files:
        df = pd.read_csv(fpath)
        data = preprocess_eeg(df, channels=selected_channels, **preprocessing_options)
        X, _ = extract_features(data, labels=0, window_size=window_size, step_size=step_size)
        X_list.append(X)
        y_list.append(np.zeros(X.shape[0]))

    # Combine all data
    X = np.vstack(X_list)
    y = np.concatenate(y_list)

    # Split into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42, stratify=y
    )

    # Train model
    model = ANFISModel()
    model.fit(X_train, y_train)

    # Save model
    model_path = os.path.join(MODEL_DIR, "trained_model.pkl")
    joblib.dump(model, model_path)

    # Evaluate
    train_accuracy = model.score(X_train, y_train)
    test_accuracy = model.score(X_test, y_test)

    # Save results JSON
    results = {
        "train_accuracy": train_accuracy,
        "test_accuracy": test_accuracy,
        "model_path": model_path,
        "num_train_samples": len(y_train),
        "num_test_samples": len(y_test)
    }
    results_path = os.path.join(RESULTS_DIR, "results.json")
    with open(results_path, "w") as f:
        json.dump(results, f, indent=4)

    return results
