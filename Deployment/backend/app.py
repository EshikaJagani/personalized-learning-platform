import requests

print("STARTING FLASK APP")
from flask import Flask, request, jsonify
import joblib

import json
import re

# importing this for changing the url for OLLAMA
import os

ALLOWED_SKILLS = {"Addition", "Subtraction", "Multiplication", "Division"}


def extract_resources(ollama_output):
    ollama_output = re.sub(r"^```.*?\n", "", ollama_output, flags=re.DOTALL)
    ollama_output = ollama_output.strip("`").strip()

    try:
        data = json.loads(ollama_output)
    except Exception:
        return {}

    clean = {}
    for skill, resources in data.items():
        if skill in ALLOWED_SKILLS:
            clean[skill] = []
            for res in resources:
                if 'title' in res and 'url' in res:
                    clean[skill].append({'title': res['title'], 'url': res['url']})
    return clean

app = Flask(__name__)

print("ADDING CORS HEADERS")

@app.after_request
def add_cors_headers(response):
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response

print("ADDED CORS HEADERS")

print("Loading model pkl")
model = joblib.load('model_quantile_gb.pkl')
print("Loading labeler pkl")
labeler = joblib.load('skill_label_encoder.pkl')

@app.route('/', methods=['GET'])
def home():
    return '''
    <h2>ML Skill Prediction API is running!</h2>
    <p>
        <b>POST</b> <code>/predict</code> endpoint expects a JSON payload like:<br>
        <pre>
{
    "attempt_count": integer,
    "fraction_of_hints_used": float,
    "time_on_task": integer,
    "problem_completed": integer,
    "student_answer_count": integer,
    "skill": "1.OA.A.1"
}
        </pre>
        The backend automatically encodes the skill code. You <b>cannot</b> use <code>GET</code> for predictions.
    </p>
    <h3>Core Skill Code Mapping Used in This API</h3>
    <table border='1' cellpadding='4'>
        <tr>
            <th>Concept</th>
            <th>Skill Code</th>
            <th>Common Core Description</th>
        </tr>
        <tr>
            <td>Addition</td>
            <td>1.OA.A.1</td>
            <td>Use addition and subtraction within 20 to solve word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions.</td>
        </tr>
        <tr>
            <td>Subtraction</td>
            <td>1.OA.C.6</td>
            <td>Add and subtract within 20, demonstrating fluency for addition and subtraction within 10.</td>
        </tr>
        <tr>
            <td>Multiplication</td>
            <td>3.OA.A.1</td>
            <td>Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each.</td>
        </tr>
        <tr>
            <td>Division</td>
            <td>3.OA.A.2</td>
            <td>Interpret whole-number quotients of whole numbers, e.g., interpret 56 ÷ 8 as the number of objects in each share.</td>
        </tr>
    </table>
    <p>
        <b>How the frontend works:</b>
        <ol>
            <li>The frontend collects or generates the input values (from a form or user interaction).</li>
            <li>It issues a <b>POST</b> request to <code>/predict</code> with those values in JSON (including <b>skill code</b>).</li>
            <li>The backend (this API) encodes the skill code, runs the model, and responds with JSON (prediction and label).</li>
            <li>The frontend receives and displays the result in the UI from the JSON response.</li>
        </ol>
    </p>
    '''


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    skill_code = data.get('main_skill_enc')
    if skill_code is None:
        return jsonify({"error": "Missing required field: 'skill'"}), 400
    try:
        main_skill_enc = int(labeler.transform([skill_code])[0])
    except Exception as e:
        return jsonify({"error": f"Unknown skill code: {skill_code}"}), 400

    features = [
        data.get('attempt_count'),
        data.get('fraction_of_hints_used'),
        data.get('time_on_task'),
        data.get('problem_completed'),
        data.get('student_answer_count'),
        main_skill_enc
    ]
    prediction = model.predict([features])[0]
    return jsonify({
        'prediction': str(prediction),
        'label': str(prediction)
    })


skill_code_to_desc = {
    "1.OA.A.1": "Addition",
    "1.OA.C.6": "Subtraction",
    "3.OA.A.1": "Multiplication",
    "3.OA.A.2": "Division",
}

def query_ollama(prompt, model='phi3'):
    """
    Sends a prompt to Ollama REST API and returns the full (joined) reply.
    """
    # url = "http://localhost:11434/api/generate"
    # changing the url for OLLAMA
    url = os.getenv("OLLAMA_URL", "http://localhost:11434") + "/api/generate"
    response = requests.post(url, json={"model": model, "prompt": prompt}, stream=True)
    answer = ""
    for line in response.iter_lines():
        if not line:
            continue
        import json
        obj = json.loads(line.decode('utf-8'))
        answer += obj.get("response", "")
    return answer

@app.route('/resources', methods=['POST'])
def get_resources():
    # debug print
    print("💡 /resources endpoint was HIT!")
    data = request.get_json()
    skill_codes = data.get('skills')
    if not skill_codes or not isinstance(skill_codes, list):
        return jsonify({"error": "Please provide a JSON list field 'skills'."}), 400

    descriptions = [skill_code_to_desc.get(code, code) for code in skill_codes]
    skills_text = ', '.join(descriptions)
    prompt = (
        f"For ONLY the following math skills: {skills_text}, "
        "for each skill, list exactly two helpful, free online learning resources or video lessons, "
        'and output as JSON mapping each skill to a list of two objects with "title" and "url" fields. '
        'Example: {"Addition": [{"title": "Khan Academy Addition", "url": "https://..."}, ...]}. '
        "No descriptions, no extra text, no formatting. Return ONLY the JSON. Do NOT include any skills not listed."
    )

    ollama_output = query_ollama(prompt, model='phi3')
    # adding a print statement here to debug and see the entire output
    print("OLLAMA RAW OUTPUT:")
    print(ollama_output)
    resources_cleaned = extract_resources(ollama_output)
    return jsonify(resources_cleaned)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
