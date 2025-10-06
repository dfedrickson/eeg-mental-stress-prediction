import numpy as np
from scipy.signal import butter, filtfilt

def bandpass_filter(data, lowcut=0.5, highcut=50, fs=256, order=5):
    """
    Apply Butterworth bandpass filter to EEG signals.
    """
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return filtfilt(b, a, data, axis=0)

def preprocess_eeg(df, channels=None, filter=True, normalize=True):
    """
    Preprocess EEG data:
    - Select channels
    - Bandpass filter
    - Z-score normalization
    """
    # Select channels
    if channels:
        df = df[channels]

    data = df.values.astype(float)

    # Bandpass filter
    if filter:
        data = bandpass_filter(data)

    # Z-score normalization
    if normalize:
        mean = np.mean(data, axis=0)
        std = np.std(data, axis=0)
        std[std == 0] = 1  # avoid division by zero
        data = (data - mean) / std

    return data
