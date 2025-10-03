import numpy as np
from lime.lime_tabular import LimeTabularExplainer

def explain_prediction(model, features):
    """
    Generate LIME explanation for a single prediction.
    - model: trained ANFIS model
    - features: 1D numpy array of features
    Returns a dict of feature importance values.
    """
    # LIME expects 2D array
    features_2d = features.reshape(1, -1)
    
    # Create a dummy dataset for LIME (replace with realistic training data if available)
    explainer = LimeTabularExplainer(
        training_data=np.random.rand(100, features.shape[0]),  # placeholder
        feature_names=[f"f{i}" for i in range(features.shape[0])],
        class_names=["stress_level"],
        mode="regression"
    )

    exp = explainer.explain_instance(features_2d[0], model.predict, num_features=10)
    
    # Convert explanation to dictionary
    explanation_dict = {feature: weight for feature, weight in exp.as_list()}
    return explanation_dict
