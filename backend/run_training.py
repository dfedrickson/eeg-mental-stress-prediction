from train import train_model

# SAM-40 dataset paths
condition_dir = "data/condition"  # Arithmetic & Stroop subfolders
control_dir = "data/control"      # Relax subfolder

# Selected channels from SAM-40 (Fp1, F7, FC5, P7, F8, Fp2)
selected_channels = [2, 3, 7, 13, 29, 31]
# Convert to strings for pandas column selection
selected_channels = [str(i) for i in selected_channels]

# Preprocessing options
preprocessing_options = {
    "filter": True,
    "normalize": True
}

if __name__ == "__main__":
    results = train_model(condition_dir, control_dir, selected_channels, preprocessing_options)
    print("Training completed!")
    print("Training Accuracy:", results["train_accuracy"])
    print("Test Accuracy:", results["test_accuracy"])
    print("Model saved at:", results["model_path"])

