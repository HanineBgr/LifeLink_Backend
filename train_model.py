import pandas as pd

symptom_weights_data = pd.read_csv('health_tips/Symptom_Weights.csv', encoding='ISO-8859-1')
doctor_versus_disease_data = pd.read_csv('health_tips/Doctor_Versus_Disease.csv', encoding='ISO-8859-1')
disease_description_data = pd.read_csv('health_tips/Disease_Description.csv', encoding='ISO-8859-1')



print(symptom_weights_data.head())  
print(doctor_versus_disease_data.head())
print(disease_description_data.head())  

