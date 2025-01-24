import pandas as pd

# Load the CSV files
symptom_weights = pd.read_csv('Symptom_Weights.csv')
specialist_data = pd.read_csv('Specialist.csv')
original_data = pd.read_csv('Original_Dataset.csv')
doctor_versus_disease = pd.read_csv('Doctor_Versus_Disease.csv')
doctor_specialist = pd.read_csv('Doctor_Specialist.csv')
disease_description = pd.read_csv('Disease_Description.csv')

# Check the first few rows of the data to understand the structure
print(symptom_weights.head())
print(specialist_data.head())
print(original_data.head())
print(doctor_versus_disease.head())
print(doctor_specialist.head())
print(disease_description.head())
