// this component displays the Questions for each of the skills
// Conditional Rendering (if else-if else logic): https://www.youtube.com/watch?v=AUlea_c_oOY,  https://www.youtube.com/watch?v=wYNxXnaBlHk
// Hint Button Logic: https://www.youtube.com/watch?v=i6eaLbuBraM
// Time Elapsed Logic: https://www.geeksforgeeks.org/javascript/finding-the-time-elapsed-in-javascript/
// Countdown video (the exact opp):https://www.youtube.com/watch?v=pjDFNUweDzs
// Official Skill Codes: https://www.thecorestandards.org/Math/Content/1/OA/
// Carousel code: Bootstrap page
// from that i am mapping the skill codes as:
// addition: 1.OA.A.1
// subtraction: 1.OA.C.6
// multiplication: 3.OA.A.1
// division: 3.OA.A.2

import "./QuestionSection.css";
import React, { useState } from "react";

interface QuestionSectionProps {
  item: string;
  // chatgpt code for stats in infosection starts here
  updateStats: (key: string, value: number | string | boolean) => void;
  // skillStats: any;
  skillStats: {
    [key: string]: any;
    skillStats: Record<string, any>;
  };
  // chatgpt code for stats in infosection ends here
}

const correctAnswers: Record<string, Record<string, string>> = {
  Addition: {
    "add-q1": "C",
    "add-q2": "B",
    "add-q3": "B",
  },
  Subtraction: {
    "sub-q1": "A",
    "sub-q2": "C",
    "sub-q3": "D",
  },
  Multiplication: {
    "mul-q1": "B",
    "mul-q2": "A",
    "mul-q3": "D",
  },
  Division: {
    "divi-q1": "C",
    "divi-q2": "A",
    "divi-q3": "D",
  },
};

function QuestionSection({
  item,
  updateStats,
  skillStats,
}: QuestionSectionProps) {
  // code for mapping:
  const skillCodeMap: Record<string, string> = {
    Addition: "1.OA.A.1",
    Subtraction: "1.OA.C.6",
    Multiplication: "3.OA.A.1",
    Division: "3.OA.A.2",
  };
  const skillCode = skillCodeMap[item];

  // chatgpt code for storing selected radios starts here
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const handleAnswerChange = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    // chatgpt code for storing selected radios ends here

    updateStats("attempt_count", skillStats[skillCode].attempt_count + 1);
    const isCorrect =
      correctAnswers[item] && correctAnswers[item][questionId] === option;
    updateStats(
      "problem_completed",
      skillStats[skillCode].problem_completed + (isCorrect ? 1 : 0)
    );
    updateStats(
      "student_answer_count",
      // skillStats[item].student_answer_count + 1
      skillStats[skillCode].student_answer_count + 1
    );
  };
  // button click logic: https://www.geeksforgeeks.org/reactjs/how-to-create-a-simple-counter-using-reactjs/
  // little help from chatgpt.. for debugging
  const handleClick = () => {
    const current = Number(skillStats[skillCode]?.fraction_of_hints_used ?? 0);
    const newCount = (current + 0.1).toFixed(2);
    updateStats("fraction_of_hints_used", newCount);
  };

  // ADDITION
  // copied and pasted one question format for all others and changed the ids and names wherever needed
  // copies and pasted addition format to all other skills, but changes the questions, ids, and names
  if (item === "Addition") {
    return (
      <>
        <div className="question_container">
          <div className="skill-header">
            <h2>{item} Assignment</h2>
            <div className="hint-button">
              <button className="button-button" onClick={handleClick}>
                Hint
              </button>
            </div>
          </div>
          <div
            id="questionCarousel"
            className="carousel slide"
            // data-bs-ride="carousel"
            data-bs-ride="false"
            // bcoz i dont want it to move to next question in every 5 seconds
          >
            <div className="carousel-inner">
              {/* First question */}
              <div className="carousel-item active">
                <div className="question_box">
                  <h4>Question 1</h4>
                  <p>What is 5 + 7?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q1"
                        value="A"
                        id="add-q1-optA"
                        checked={answers["add-q1"] === "A"}
                        onChange={() => handleAnswerChange("add-q1", "A")}
                      />
                      <label className="form-check-label"> A. 10</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q1"
                        value="B"
                        id="add-q1-optB"
                        checked={answers["add-q1"] === "B"}
                        onChange={() => handleAnswerChange("add-q1", "B")}
                      />
                      <label className="form-check-label"> B. 11</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q1"
                        value="C"
                        id="add-q1-optC"
                        checked={answers["add-q1"] === "C"}
                        onChange={() => handleAnswerChange("add-q1", "C")}
                      />
                      <label className="form-check-label">C. 12</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q1"
                        value="D"
                        id="add-q1-optD"
                        checked={answers["add-q1"] === "D"}
                        onChange={() => handleAnswerChange("add-q1", "D")}
                      />
                      <label className="form-check-label">D. 13</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Second question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 2</h4>
                  <p>What is 3 + 4?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q2"
                        value="A"
                        id="add-q2-optA"
                        checked={answers["add-q2"] === "A"}
                        onChange={() => handleAnswerChange("add-q2", "A")}
                      />
                      <label className="form-check-label">A. 6</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q2"
                        value="B"
                        id="add-q2-optB"
                        checked={answers["add-q2"] === "B"}
                        onChange={() => handleAnswerChange("add-q2", "B")}
                      />
                      <label className="form-check-label">B. 7</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q2"
                        value="C"
                        id="add-q2-optC"
                        checked={answers["add-q2"] === "C"}
                        onChange={() => handleAnswerChange("add-q2", "C")}
                      />
                      <label className="form-check-label">C. 8</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q2"
                        value="D"
                        id="add-q2-optD"
                        checked={answers["add-q2"] === "D"}
                        onChange={() => handleAnswerChange("add-q2", "D")}
                      />
                      <label className="form-check-label">D. 9</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 3</h4>
                  <p>What is 2 + 2?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q3"
                        value="A"
                        id="add-q3-optA"
                        checked={answers["add-q3"] === "A"}
                        onChange={() => handleAnswerChange("add-q3", "A")}
                      />
                      <label className="form-check-label">A. 3</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q3"
                        value="B"
                        id="add-q3-optB"
                        checked={answers["add-q3"] === "B"}
                        onChange={() => handleAnswerChange("add-q3", "B")}
                      />
                      <label className="form-check-label">B. 4</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q3"
                        value="C"
                        id="add-q3-optC"
                        checked={answers["add-q3"] === "C"}
                        onChange={() => handleAnswerChange("add-q3", "C")}
                      />
                      <label className="form-check-label">C. 5</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q3"
                        value="D"
                        id="add-q3-optD"
                        checked={answers["add-q3"] === "D"}
                        onChange={() => handleAnswerChange("add-q3", "D")}
                      />
                      <label className="form-check-label">D. 6</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Prev and Next buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </>
    );
  }
  //SUBTRACTION
  if (item === "Subtraction") {
    return (
      <>
        <div className="question_container">
          <div className="skill-header">
            <h2>{item} Assignment</h2>
            <div className="hint-button">
              <button className="button-button" onClick={handleClick}>
                Hint
              </button>
            </div>
          </div>
          <div
            id="questionCarousel"
            className="carousel slide"
            // data-bs-ride="carousel"
            data-bs-ride="false"
            // bcoz i dont want it to move to next question in every 5 seconds
          >
            <div className="carousel-inner">
              {/* First question */}
              <div className="carousel-item active">
                <div className="question_box">
                  <h4>Question 1</h4>
                  <p>What is 1 - 1?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q1"
                        value="A"
                        id="add-q1-optA"
                        checked={answers["sub-q1"] === "A"}
                        onChange={() => handleAnswerChange("sub-q1", "A")}
                      />
                      <label className="form-check-label"> A. 0</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q1"
                        value="B"
                        id="add-q1-optB"
                        checked={answers["sub-q1"] === "B"}
                        onChange={() => handleAnswerChange("sub-q1", "B")}
                      />
                      <label className="form-check-label"> B. 1</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q1"
                        value="C"
                        id="add-q1-optC"
                        checked={answers["sub-q1"] === "C"}
                        onChange={() => handleAnswerChange("sub-q1", "C")}
                      />
                      <label className="form-check-label">C. 10</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q1"
                        value="D"
                        id="add-q1-optD"
                        checked={answers["sub-q1"] === "D"}
                        onChange={() => handleAnswerChange("sub-q1", "D")}
                      />
                      <label className="form-check-label">D. 00</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Second question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 2</h4>
                  <p>What is 100 - 25?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q2"
                        value="A"
                        id="add-q2-optA"
                        checked={answers["sub-q2"] === "A"}
                        onChange={() => handleAnswerChange("sub-q2", "A")}
                      />
                      <label className="form-check-label">A. 25</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q2"
                        value="B"
                        id="add-q2-optB"
                        checked={answers["sub-q2"] === "B"}
                        onChange={() => handleAnswerChange("sub-q2", "B")}
                      />
                      <label className="form-check-label">B. 50</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q2"
                        value="C"
                        id="add-q2-optC"
                        checked={answers["sub-q2"] === "C"}
                        onChange={() => handleAnswerChange("sub-q2", "C")}
                      />
                      <label className="form-check-label">C. 75</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q2"
                        value="D"
                        id="add-q2-optD"
                        checked={answers["sub-q2"] === "D"}
                        onChange={() => handleAnswerChange("sub-q2", "D")}
                      />
                      <label className="form-check-label">D. 5</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 3</h4>
                  <p>What is 10 - 2?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="add-q3"
                        value="A"
                        id="sub-q3-optA"
                        checked={answers["sub-q3"] === "A"}
                        onChange={() => handleAnswerChange("sub-q3", "A")}
                      />
                      <label className="form-check-label">A. 9</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q3"
                        value="B"
                        id="add-q3-optB"
                        checked={answers["sub-q3"] === "B"}
                        onChange={() => handleAnswerChange("sub-q3", "B")}
                      />
                      <label className="form-check-label">B. 1</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q3"
                        value="C"
                        id="add-q3-optC"
                        checked={answers["sub-q3"] === "C"}
                        onChange={() => handleAnswerChange("sub-q3", "C")}
                      />
                      <label className="form-check-label">C. 0</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="sub-q3"
                        value="D"
                        id="add-q3-optD"
                        checked={answers["sub-q3"] === "D"}
                        onChange={() => handleAnswerChange("sub-q3", "D")}
                      />
                      <label className="form-check-label">D. 8</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Prev and Next buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </>
    );
  }
  // MULTIPLICATION
  if (item === "Multiplication") {
    return (
      <>
        <div className="question_container">
          <div className="skill-header">
            <h2>{item} Assignment</h2>
            <div className="hint-button">
              <button className="button-button" onClick={handleClick}>
                Hint
              </button>
            </div>
          </div>
          <div
            id="questionCarousel"
            className="carousel slide"
            // data-bs-ride="carousel"
            data-bs-ride="false"
            // bcoz i dont want it to move to next question in every 5 seconds
          >
            <div className="carousel-inner">
              {/* First question */}
              <div className="carousel-item active">
                <div className="question_box">
                  <h4>Question 1</h4>
                  <p>What is 10 x 20?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q1"
                        value="A"
                        id="mul-q1-optA"
                        checked={answers["mul-q1"] === "A"}
                        onChange={() => handleAnswerChange("mul-q1", "A")}
                      />
                      <label className="form-check-label"> A. 20</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q1"
                        value="B"
                        id="mul-q1-optB"
                        checked={answers["mul-q1"] === "B"}
                        onChange={() => handleAnswerChange("mul-q1", "B")}
                      />
                      <label className="form-check-label"> B. 200</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q1"
                        value="C"
                        id="mul-q1-optC"
                        checked={answers["mul-q1"] === "C"}
                        onChange={() => handleAnswerChange("mul-q1", "C")}
                      />
                      <label className="form-check-label">C. 100</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q1"
                        value="D"
                        id="mul-q1-optD"
                        checked={answers["mul-q1"] === "D"}
                        onChange={() => handleAnswerChange("mul-q1", "D")}
                      />
                      <label className="form-check-label">D. 2000</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Second question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 2</h4>
                  <p>What is 5 x 8?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q2"
                        value="A"
                        id="mul-q2-optA"
                        checked={answers["mul-q2"] === "A"}
                        onChange={() => handleAnswerChange("mul-q2", "A")}
                      />
                      <label className="form-check-label">A. 40</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q2"
                        value="B"
                        id="mul-q2-optB"
                        checked={answers["mul-q2"] === "B"}
                        onChange={() => handleAnswerChange("mul-q2", "B")}
                      />
                      <label className="form-check-label">B. 20</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q2"
                        value="C"
                        id="mul-q2-optC"
                        checked={answers["mul-q2"] === "C"}
                        onChange={() => handleAnswerChange("mul-q2", "C")}
                      />
                      <label className="form-check-label">C. 30</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q2"
                        value="D"
                        id="mul-q2-optD"
                        checked={answers["mul-q2"] === "D"}
                        onChange={() => handleAnswerChange("mul-q2", "D")}
                      />
                      <label className="form-check-label">D. 25</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 3</h4>
                  <p>What is 7 x 7?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q3"
                        value="A"
                        id="mul-q3-optA"
                        checked={answers["mul-q3"] === "A"}
                        onChange={() => handleAnswerChange("mul-q3", "A")}
                      />
                      <label className="form-check-label">A. 14</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q3"
                        value="B"
                        id="mul-q3-optB"
                        checked={answers["mul-q3"] === "B"}
                        onChange={() => handleAnswerChange("mul-q3", "B")}
                      />
                      <label className="form-check-label">B. 15</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q3"
                        value="C"
                        id="mul-q3-optC"
                        checked={answers["mul-q3"] === "C"}
                        onChange={() => handleAnswerChange("mul-q3", "C")}
                      />
                      <label className="form-check-label">C. 48</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="mul-q3"
                        value="D"
                        id="mul-q3-optD"
                        checked={answers["mul-q3"] === "D"}
                        onChange={() => handleAnswerChange("mul-q3", "D")}
                      />
                      <label className="form-check-label">D. 49</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Prev and Next buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </>
    );
  }
  // DIVISION
  if (item === "Division") {
    return (
      <>
        <div className="question_container">
          <div className="skill-header">
            <h2>{item} Assignment</h2>
            <div className="hint-button">
              <button className="button-button" onClick={handleClick}>
                Hint
              </button>
            </div>
          </div>
          <div
            id="questionCarousel"
            className="carousel slide"
            // data-bs-ride="carousel"
            data-bs-ride="false"
            // bcoz i dont want it to move to next question in every 5 seconds
          >
            <div className="carousel-inner">
              {/* First question */}
              <div className="carousel-item active">
                <div className="question_box">
                  <h4>Question 1</h4>
                  <p>What is 10 / 2?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q1"
                        value="A"
                        id="divi-q1-optA"
                        checked={answers["divi-q1"] === "A"}
                        onChange={() => handleAnswerChange("divi-q1", "A")}
                      />
                      <label className="form-check-label"> A. 20</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q1"
                        value="B"
                        id="divi-q1-optB"
                        checked={answers["divi-q1"] === "B"}
                        onChange={() => handleAnswerChange("divi-q1", "B")}
                      />
                      <label className="form-check-label"> B. 10</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q1"
                        value="C"
                        id="divi-q1-optC"
                        checked={answers["divi-q1"] === "C"}
                        onChange={() => handleAnswerChange("divi-q1", "C")}
                      />
                      <label className="form-check-label">C. 5</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q1"
                        value="D"
                        id="divi-q1-optD"
                        checked={answers["divi-q1"] === "D"}
                        onChange={() => handleAnswerChange("divi-q1", "D")}
                      />
                      <label className="form-check-label">D. 1</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Second question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 2</h4>
                  <p>What is 45 / 15?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q2"
                        value="A"
                        id="divi-q2-optA"
                        checked={answers["divi-q2"] === "A"}
                        onChange={() => handleAnswerChange("divi-q2", "A")}
                      />
                      <label className="form-check-label">A. 3</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q2"
                        value="B"
                        id="divi-q2-optB"
                        checked={answers["divi-q2"] === "B"}
                        onChange={() => handleAnswerChange("divi-q2", "B")}
                      />
                      <label className="form-check-label">B. 5</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q2"
                        value="C"
                        id="divi-q2-optC"
                        checked={answers["divi-q2"] === "C"}
                        onChange={() => handleAnswerChange("divi-q2", "C")}
                      />
                      <label className="form-check-label">C. 2</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q2"
                        value="D"
                        id="divi-q2-optD"
                        checked={answers["divi-q2"] === "D"}
                        onChange={() => handleAnswerChange("divi-q2", "D")}
                      />
                      <label className="form-check-label">D. 4</label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Third question */}
              <div className="carousel-item">
                <div className="question_box">
                  <h4>Question 3</h4>
                  <p>What is 5 / 5?</p>
                  <ul>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q3"
                        value="A"
                        id="divi-q3-optA"
                        checked={answers["divi-q3"] === "A"}
                        onChange={() => handleAnswerChange("divi-q3", "A")}
                      />
                      <label className="form-check-label">A. 10</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q3"
                        value="B"
                        id="divi-q3-optB"
                        checked={answers["divi-q3"] === "B"}
                        onChange={() => handleAnswerChange("divi-q3", "B")}
                      />
                      <label className="form-check-label">B. 15</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q3"
                        value="C"
                        id="divi-q3-optC"
                        checked={answers["divi-q3"] === "C"}
                        onChange={() => handleAnswerChange("divi-q3", "C")}
                      />
                      <label className="form-check-label">C. 5</label>
                    </li>
                    <li>
                      <input
                        className="form-check-input me-1"
                        type="radio"
                        name="divi-q3"
                        value="D"
                        id="divi-q3-optD"
                        checked={answers["divi-q3"] === "D"}
                        onChange={() => handleAnswerChange("divi-q3", "D")}
                      />
                      <label className="form-check-label">D. 1</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Prev and Next buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#questionCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </>
    );
  }
  // so there must be some skill selected (by default it selects addition)!
  // for backup, if nothing selected then a general msg saying select a skill
  else {
    return (
      <div>
        <h2>Please Select a Skill</h2>
      </div>
    );
  }
}

export default QuestionSection;
