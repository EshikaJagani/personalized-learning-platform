# Backend Documentation

## API Overview

The backend is a Python Flask web app that exposes two main APIs:
/predict — predicts student skill strength (weak/strong/average) from student activity data using an ML model.
/resources — generates learning resource links for a list of weak topics using a local Large Language Model (LLM) via Ollama.

## Key Components

Flask App: Handles incoming HTTP requests and routes them to logic for prediction or resource generation.
ML Model Integration: Loads both the trained GradientBoostingClassifier and the skill label encoder from disk.
CORS Settings: Adds the proper headers to allow frontend web apps to call API endpoints from the browser.

## Endpoints

1. /predict (POST)
   Purpose: Predicts whether a given skill for a student is "weak", "average", or "strong".
   Input JSON:
   {
   "attempt_count": <float>,
   "fraction_of_hints_used": <float>,
   "time_on_task": <float>,
   "problem_completed": <float>,
   "student_answer_count": <float>,
   "skill": <string>
   }
   Processing:
   Encodes the skill code using the loaded LabelEncoder.
   Runs the feature vector through the ML model.
   Output JSON:
   { "prediction": "weak" } // or "average"/"strong"
   Typical Use: Called by the frontend when it has new activity data for a student/skill.

2. /resources (POST)
   Purpose: Returns learning resource links for a list of weak (or any) skill codes.
   Input JSON:
   { "skills": ["1.OA.A.1", "3.OA.A.1"] }
   Processing:
   Maps skill codes to readable names.
   Constructs a prompt for the LLM (Ollama).
   Calls a local Ollama API (localhost:11434) with the prompt.
   Extracts and formats links from the LLM output.
   Output JSON: Maps each input skill to a list of resource dicts, e.g.:
   {
   "Addition": [
   {"title": "Khan Academy Addition", "url": "https://..."},
   ...
   ],
   "Multiplication": [ ... ]
   }

## Why This Design?

API separation: /predict and /resources are separated for clarity, scalability, and security.
Prediction workloads are lightweight and frequent.
Resource generation (LLM) is more compute-intensive and isolated for stability.
Model serving: Both endpoints run on cloud VMs (or containers), enabling real-time inference and flexible scaling.
Ollama LLM is run locally for cost and privacy reasons, ensuring fast access for resource generation.

## How to Run Locally

Install requirements: pip install flask joblib scikit-learn
Ensure model_quantile_gb.pkl and skill_label_encoder.pkl are in the project folder.
Start the backend:
python app.py
The API will be available at http://localhost:8000/
Sample Request (predict):
<br/>

`curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{"attempt_count":2,"fraction_of_hints_used":0.1,"time_on_task":120,"problem_completed":1,"student_answer_count":5,"skill":"1.OA.C.6"}`
