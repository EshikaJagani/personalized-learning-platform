# Machine Learning in Local Machine

## 📂 Data Files

- [`pdets.csv`](https://drive.google.com/file/d/1jaeVDH3UfgJWuCpjYKYrLJqa3WvyvPo0/view?usp=sharing)
- [`plogs.csv`](https://drive.google.com/file/d/1OsnNZP_blrg3DYwMO1QfLM13_7wmPtC6/view?usp=sharing)
- [`plogs_with_metadata.csv`](https://drive.google.com/file/d/1T_z_bX_WmB6jRNkD5AsW3kXHe3MvwzOj/view?usp=sharing)
- [`plogs_with_metadata_cleaned.csv`](https://drive.google.com/file/d/1d725UsrPcm4Eqjme8zniUx6DbnX-xR5h/view?usp=sharing)

## Documentation

### Data Files Used

- plogs_with_metadata_cleaned.csv: Main preprocessed dataset used for feature engineering and model training. (See Data Files above for download link.)

### Training Code: train_model.py

This script does the following:

- <b>Data Loading and Cleaning</b>
  - Reads in plogs_with_metadata_cleaned.csv.
  - Safely parses list-like columns (skills, tutoring_types, content_source).
- <b>Feature Engineering</b>
  - Extracts the main skill for each record and label-encodes it.
  - Aggregates the dataset by student_id and main skill, averaging performance features for each student-skill pair.
- <b>Label Creation</b>
  - Splits students into three skill levels (weak, average, strong) based on quantiles of the correct column (average correctness).
- <b>Model Training:</b>

  1. Uses features:

  - attempt_count
  - fraction_of_hints_used
  - time_on_task
  - problem_completed
  - student_answer_count
  - main_skill_enc (encoded main skill)

  2. Splits data into train/test sets with stratification.
  3. Trains a GradientBoostingClassifier on the features to predict skill strength.
  4. Evaluates via classification report and prints feature importances.

- <b>Model Saving</b>
  - Saves the trained model and label encoder to disk with joblib (commented in example but can be enabled).
- <b>Inference Code: predict.py</b>
  - This script demonstrates how to load the trained model and encoder and make predictions on new data:
  - Loads the trained model and label encoder.
  - Prepares a sample input with the same features as used during training.
  - Encodes the main skill using the label encoder.
  - Predicts the skill level for the input data and prints the result.
- <b>Summary of Features</b>
  - attempt_count: Average attempts per question.
  - fraction_of_hints_used: Fraction of problems where hints were used.
  - time_on_task: Average time spent on tasks.
  - problem_completed: Fraction of problems completed.
  - student_answer_count: Number of answers submitted by the student.
  - main_skill_enc: Encoded identifier for the main skill/topic.
- <b>How to Run</b>
  - Install required packages: pip install pandas numpy scikit-learn joblib
  - Place the dataset (plogs_with_metadata_cleaned.csv) in the same directory.
  - Run training: python train_model.py
  - Run inference: python predict.py
