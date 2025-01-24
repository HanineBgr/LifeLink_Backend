import pandas as pd

symptom_weights_data = pd.read_csv('health_tips/Symptom_Weights.csv', encoding='ISO-8859-1')
doctor_versus_disease_data = pd.read_csv('health_tips/Doctor_Versus_Disease.csv', encoding='ISO-8859-1')
disease_description_data = pd.read_csv('health_tips/Disease_Description.csv', encoding='ISO-8859-1')


print("Missing values in symptom_weights_data:")
print(symptom_weights_data.isnull().sum())

print("Missing values in doctor_versus_disease_data:")
print(doctor_versus_disease_data.isnull().sum())

print("Missing values in disease_description_data:")
print(disease_description_data.isnull().sum())
print(symptom_weights_data.describe())
print(doctor_versus_disease_data.describe())
print(disease_description_data.describe())

# Check for unique values in categorical columns
print(symptom_weights_data['abdominal_pain'].unique())
print(doctor_versus_disease_data['Drug Reaction'].unique())
print(disease_description_data['Disease'].unique())