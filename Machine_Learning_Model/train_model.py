if __name__ == '__main__':

    import pandas as pd
    import numpy as np
    import ast
    import joblib
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import LabelEncoder
    from sklearn.ensemble import GradientBoostingClassifier
    from sklearn.metrics import classification_report
    from sklearn.dummy import DummyClassifier

    # Optional: for boxplots
    try:
        import matplotlib.pyplot as plt
        do_plot = True
    except ImportError:
        do_plot = False

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

    print("\n=== Label Counts ===")
    print(agg['skill_level_quantile'].value_counts())
    print("q1:", q1, "q2:", q2)
    print(agg['correct'].describe())
    print(agg['skill_level_quantile'].value_counts())

    # Train/test split with stratification
    X = agg[features]
    y = agg['skill_level_quantile']
    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
    print("\n=== Train/Test Label Counts ===")
    print("Train:")
    print(pd.Series(y_train).value_counts())
    print("Test:")
    print(pd.Series(y_test).value_counts())

    # Train model
    clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("\nSample predictions:", clf.predict(X_test[:10]))

    print("\n=== Classification Report ===")
    print(classification_report(y_test, y_pred, target_names=['weak', 'average', 'strong']))
    print(X.describe())
    print("Any NaNs?\n", X.isnull().any())

    dummy = DummyClassifier(strategy="most_frequent")
    dummy.fit(X_train, y_train)
    print("Dummy predictions:", dummy.predict(X_test[:10]))

    # ==== Feature importances ====
    print("\n=== Feature Importances ===")
    feature_importances = clf.feature_importances_
    for fname, score in zip(features, feature_importances):
        print(f"{fname:25s}: {score:.3f}")

    # ==== Per-skill-level feature stats ====
    print("\n=== Per-Skill Level Feature Means ===")
    print(agg.groupby('skill_level_quantile')[features].mean())

    print("\n=== Per-Skill Level Feature Description (summary stats) ===")
    print(agg.groupby('skill_level_quantile')[features].describe())

    # ==== Boxplots (optional, needs matplotlib) ====
    if do_plot:
        print("\n=== Displaying boxplots for features by skill level ===")
        for feature in features:
            agg.boxplot(column=feature, by='skill_level_quantile')
            plt.title(f"{feature} by skill_level_quantile")
            plt.suptitle('')
            plt.tight_layout()
            plt.show()

    # ==== Correlation ====
    print("\n=== Feature correlations with skill_level_quantile ===")
    label_map = {'weak': 0, 'average': 1, 'strong': 2}
    agg['quantile_numeric'] = agg['skill_level_quantile'].map(label_map)
    corr = agg[features + ['quantile_numeric']].corr()
    print(corr['quantile_numeric'].sort_values(ascending=False))

    feature_means = agg.groupby('skill_level_quantile')[features].mean()
    for label in ['weak', 'average', 'strong']:
        print(f"\n=== {label.capitalize()} ===")
        for feat in ['fraction_of_hints_used', 'time_on_task', 'problem_completed', 'student_answer_count']:
            print(f"{feat:25s}: {feature_means.loc[label, feat]:.3f}")




    # Save model and labeler
    # joblib.dump(clf, 'model_quantile_gb.pkl')
    # joblib.dump(labeler, 'skill_label_encoder.pkl')
    print("Model and encoder saved as 'model_quantile_gb.pkl' and 'skill_label_encoder.pkl'")