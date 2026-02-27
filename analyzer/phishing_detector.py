import re
import ipaddress
from urllib.parse import urlparse
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "phishing_model.pkl")

model = joblib.load(MODEL_PATH)


class PhishingDetector:

    suspicious_keywords = [
        "login", "verify", "update", "secure",
        "account", "bank", "confirm", "password",
        "signin", "wallet", "crypto"
    ]

    def extract_features(self, url: str):
        features = {}

        parsed = urlparse(url)
        domain = parsed.netloc

        features["url_length"] = len(url)

        keyword_count = sum(
            1 for word in self.suspicious_keywords
            if word in url.lower()
        )
        features["suspicious_keywords"] = keyword_count

        features["special_char_count"] = len(re.findall(r"[^\w]", url))

        try:
            ipaddress.ip_address(domain)
            features["uses_ip"] = 1
        except:
            features["uses_ip"] = 0

        features["subdomain_count"] = domain.count(".")

        return features

    def analyze(self, url: str):
        features = self.extract_features(url)

        feature_vector = [[
            features["url_length"],
            features["suspicious_keywords"],
            features["special_char_count"],
            features["uses_ip"],
            features["subdomain_count"]
        ]]

        prediction = model.predict(feature_vector)[0]
        probability = model.predict_proba(feature_vector)[0][1]

        probability_percent = round(probability * 100, 2)

        print("ML Probability:", probability_percent) 

        if probability_percent >= 70:
            risk = "High"
        elif probability_percent >= 40:
            risk = "Medium"
        else:
            risk = "Low"

        return {
            "url": url,
            "risk_level": risk,
            "phishing_probability_percent": probability_percent,
            "ml_prediction": int(prediction),
            "features": features
        }