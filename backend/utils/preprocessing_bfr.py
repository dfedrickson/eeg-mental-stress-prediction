import numpy as np
import pandas as pd
from scipy.signal import butter, lfilter

def load_eeg(filepath):
    """
    Load EEG data from CSV (or other formats).
    For SAM-40, CSV is assumed: rows=time, columns=channels.
    """
    return pd.read_csv(filepath)

def bandpass_filter(data, low=0.5, high=50, fs=256, order=5):
    """
    Apply a Butterworth bandpass filter.
    """
    nyq = 0.5 * fs
    low_cut = low / nyq
    high_cut = high / nyq
    b, a = butter(order, [low_cut, high_cut], btype='band')
    filtered = lfilter(b, a, data, axis=0)
    return filtered

def preprocess_eeg(filepath, channels=None, filter_type="bandpass", low=0.5, high=50, fs=256, remove_artifacts=False):
    """
    Preprocess EEG data.
    - channels: list of selected EEG channels
    - filter_type: "bandpass" or None
    - remove_artifacts: True/False (future ICA or thresholding)
    """
    eeg = load_eeg(filepath)

    # Select channels
    if channels:
        eeg = eeg[channels]

    # Apply bandpass filter
    if filter_type == "bandpass":
        eeg_values = bandpass_filter(eeg.values, low, high, fs)
        eeg = pd.DataFrame(eeg_values, columns=eeg.columns)

    # TODO: implement artifact removal if needed

    return eeg

def extract_features(eeg_data, channels=None):
    """
    Extract simple EEG features: Power bands and entropy.
    Returns a numpy array of features.
    """
    if channels:
        eeg_data = eeg_data[channels]

    # Example: compute band powers (dummy calculation)
    features = []
    for ch in eeg_data.columns:
        signal = eeg_data[ch].values
        alpha = np.mean(signal**2)  # placeholder
        beta = np.mean(signal**2) * 0.7  # placeholder
        theta = np.mean(signal**2) * 0.5
        gamma = np.mean(signal**2) * 0.3
        entropy = -np.sum(signal*np.log1p(np.abs(signal)))  # rough entropy
        features.extend([alpha, beta, theta, gamma, entropy])

    return np.array(features)
