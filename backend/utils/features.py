import numpy as np
from scipy.stats import skew, kurtosis
from scipy.signal import welch

def extract_features(eeg_data, labels=None, fs=256, window_size=256, step_size=128):
    """
    Extract EEG features from sliding windows.
    
    Args:
        eeg_data (np.ndarray): shape (samples, channels)
        labels (np.ndarray or list): optional
        fs (int): sampling frequency
        window_size (int): number of samples per window
        step_size (int): sliding step between windows
    Returns:
        X (np.ndarray): feature matrix
        y (np.ndarray or None): labels repeated per window
    """
    n_samples, n_channels = eeg_data.shape
    X_list = []
    y_list = []

    # Slide over the EEG data
    for start in range(0, n_samples - window_size + 1, step_size):
        end = start + window_size
        window = eeg_data[start:end, :]
        features = []

        for ch in range(n_channels):
            signal = window[:, ch]

            # Time-domain features
            features.append(np.mean(signal))
            features.append(np.std(signal))
            features.append(skew(signal))
            features.append(kurtosis(signal))
            features.append(np.ptp(signal))  # peak-to-peak

            # Frequency-domain features
            freqs, psd = welch(signal, fs=fs)
            delta = psd[(freqs >= 0.5) & (freqs < 4)].mean()
            theta = psd[(freqs >= 4) & (freqs < 8)].mean()
            alpha = psd[(freqs >= 8) & (freqs < 13)].mean()
            beta = psd[(freqs >= 13) & (freqs < 30)].mean()
            gamma = psd[(freqs >= 30) & (freqs < 50)].mean()
            features.extend([delta, theta, alpha, beta, gamma])

        X_list.append(features)
        if labels is not None:
            y_list.append(labels)

    X = np.array(X_list)
    y = np.array(y_list) if labels is not None else None

    return X, y
