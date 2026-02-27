import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Synthetic training dataset (simple but effective)
data = [
    # Legitimate
    [18, 0, 4, 0, 1, 0],
    [20, 0, 2, 0, 1, 0],
    [22, 0, 3, 0, 1, 0],
    [25, 0, 3, 0, 2, 0],

    # Phishing
    [55, 5, 10, 1, 3, 1],
    [60, 4, 12, 1, 4, 1],
    [50, 6, 9, 1, 2, 1],
    [48, 5, 8, 1, 3, 1],
]

columns = [
    "url_length",
    "suspicious_keywords",
    "special_char_count",
    "uses_ip",
    "subdomain_count",
    "label"
]

df = pd.DataFrame(data, columns=columns)

X = df.drop("label", axis=1)
y = df["label"]

model = RandomForestClassifier(n_estimators=50)
model.fit(X, y)

joblib.dump(model, "phishing_model.pkl")

print("Model trained and saved as phishing_model.pkl")