if __name__ == '__main__':

    import joblib
    import numpy as np
    import pandas as pd

    clf = joblib.load('model_quantile_gb.pkl')

    labeler = joblib.load('skill_label_encoder.pkl')

    input_data = {
        'attempt_count': 2.0,
        'fraction_of_hints_used': 0.1,
        'time_on_task': 120.0,
        'problem_completed': 1.0,
        'student_answer_count': 10.0,
        'main_skill': '7.RP.A.2b'
    }

    input_data['main_skill_enc'] = labeler.transform([input_data['main_skill']])[0]

    features = ['attempt_count', 'fraction_of_hints_used', 'time_on_task',
                'problem_completed', 'student_answer_count', 'main_skill_enc']

    X_input = pd.DataFrame([input_data])[features]

    pred = clf.predict(X_input)[0]
    print(f"Predicted Skill Level: {pred}")
