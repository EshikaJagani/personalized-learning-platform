if __name__ == '__main__':

    import pandas as pd
    import numpy as np
    import ast
    import joblib
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import LabelEncoder
    from sklearn.ensemble import GradientBoostingClassifier
    from sklearn.metrics import classification_report


    def safe_literal_eval(val):
        if isinstance(val, list): return val
        if isinstance(val, str):
            val = val.strip()
            if (val.startswith('[') and val.endswith(']')) or (val.startswith('{') and val.endswith('}')):
                try: return ast.literal_eval(val)
                except: return [val]
            return [val]
        return [val]

    print("Reading dataset...")
    df = pd.read_csv('plogs_with_metadata_cleaned.csv')
    for col in ['skills', 'tutoring_types', 'content_source']:
        df[col] = df[col].apply(safe_literal_eval)

    df['main_skill'] = df['skills'].apply(lambda x: x[0] if isinstance(x, list) and len(x) else None)
    labeler = LabelEncoder()
    df['main_skill_enc'] = labeler.fit_transform(df['main_skill'].astype(str))

    agg = df.groupby(['student_id', 'main_skill']).agg({
        'correct': 'mean',
        'attempt_count': 'mean',
        'fraction_of_hints_used': 'mean',
        'time_on_task': 'mean',
        'problem_completed': 'mean',
        'student_answer_count': 'mean'
    }).reset_index()
    agg['main_skill_enc'] = labeler.transform(agg['main_skill'].astype(str))

    # Quantile-based labels
    q1, q2 = np.percentile(agg['correct'], [33, 66])
    agg['skill_level_quantile'] = pd.cut(agg['correct'], bins=[0., q1, q2, 1.], labels=['weak', 'average', 'strong'], include_lowest=True)

    # Final features
    features = [
        'attempt_count', 'fraction_of_hints_used', 'time_on_task',
        'problem_completed', 'student_answer_count', 'main_skill_enc'
    ]

    # Train model
    X = agg[features]
    y = agg['skill_level_quantile']
    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

    clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("=== Classification Report ===")
    print(classification_report(y_test, y_pred, target_names=['weak', 'average', 'strong']))

    # Save model
    joblib.dump(clf, 'model_quantile_gb.pkl')
    joblib.dump(labeler, 'skill_label_encoder.pkl')

    print("Model and encoder saved as 'model_quantile_gb.pkl' and 'skill_label_encoder.pkl'")
