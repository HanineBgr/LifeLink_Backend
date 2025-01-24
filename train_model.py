import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load the CSV files 
symptom_weights_data = pd.read_csv('health_tips/Symptom_Weights.csv', encoding='ISO-8859-1')
doctor_versus_disease_data = pd.read_csv('health_tips/Doctor_Versus_Disease.csv', encoding='ISO-8859-1')
disease_description_data = pd.read_csv('health_tips/Disease_Description.csv', encoding='ISO-8859-1')
doctor_versus_disease_data.rename(columns={'Drug Reaction': 'Disease'}, inplace=True)

# Check the symptom weights data and doctor versus disease data to ensure columns match
print(symptom_weights_data.head())
print(doctor_versus_disease_data.head())

# Merge symptom weights data with doctor versus disease data on 'Disease'
merged_data = pd.merge(symptom_weights_data, doctor_versus_disease_data, how='left', on='Disease')

# Check the merged data to confirm
print(merged_data.head())

X = merged_data[['Weight']]  
y = merged_data['Allergist'] 

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier()

# Training the model
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)

# Calculate the accuracy of the model
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.4f}")