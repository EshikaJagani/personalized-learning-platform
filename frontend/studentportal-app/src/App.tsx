// main (basic) structure of web development using React
// https://www.youtube.com/watch?v=SqcY0GlETPk&t=10s
// this file binds all the components together
// the components for our app are: Caption, SkillsList, QuestionSection, InfoSection, and Dashboard
import SkillsList from "./components/SkillsList";
import Caption from "./components/Caption";
import QuestionSection from "./components/QuestionSection";
import InfoSection from "./components/InfoSection";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const items = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Dashboard",
  ];
  const [selectedTopic, setSelectedTopic] = useState("Addition");

  // geeksforgeeks logic for Time Elapsed: https://www.geeksforgeeks.org/javascript/finding-the-time-elapsed-in-javascript/
  // Referred many countdown videos as well on of which is: https://www.youtube.com/watch?reload=9&v=pjDFNUweDzs
  const [startTime, setStartTime] = useState<number>(Date.now());
  const skillSelect = (newTopic: string) => {
    const endTime = Date.now();
    // const timeElapsed = Math.floor((endTime - startTime) / 1000); // in seconds
    // const timeElapsed = Math.floor((endTime - startTime) / 60000); // in mins
    const timeElapsed = (endTime - startTime) / 60000;
    const skillCode = skillCodeMap[selectedTopic];
    updateStats(
      "time_on_task",
      skillStats[skillCode].time_on_task + timeElapsed
    );
    setSelectedTopic(newTopic);
    setStartTime(Date.now());
  };

  const updateStats = (key: string, value: number | string | boolean) => {
    const skillCode = skillCodeMap[selectedTopic];
    // chatgpt code for mapping skills starts here
    setSkillStats((prevStats: any) => {
      const currentStats = { ...prevStats[skillCode] };
      currentStats[key] = value;
      return { ...prevStats, [skillCode]: currentStats };
    });
    // chatgpt code for mapping skills ends here
  };

  // added a skillcode map here.. since backend accepts the skill code
  // also kept skill name for frontend displaying purpose
  const skillCodeMap: Record<string, string> = {
    Addition: "1.OA.A.1",
    Subtraction: "1.OA.C.6",
    Multiplication: "3.OA.A.1",
    Division: "3.OA.A.2",
  };
  const currentSkillCode = skillCodeMap[selectedTopic];

  // in the InfoSection (SkillStats) i want display skill code, so replaced the name with code
  const [skillStats, setSkillStats] = useState<any>({
    // Addition: {
    "1.OA.A.1": {
      attempt_count: 0,
      fraction_of_hints_used: 0.0,
      time_on_task: 0,
      problem_completed: 0,
      student_answer_count: 0,
      main_skill: "Addition",
    },
    // Subtraction: {
    "1.OA.C.6": {
      attempt_count: 0,
      fraction_of_hints_used: 0.0,
      time_on_task: 0,
      problem_completed: 0,
      student_answer_count: 0,
      main_skill: "Subtraction",
    },
    // Multiplication: {
    "3.OA.A.1": {
      attempt_count: 0,
      fraction_of_hints_used: 0.0,
      time_on_task: 0,
      problem_completed: 0,
      student_answer_count: 0,
      main_skill: "Multiplication",
    },
    // Division: {
    "3.OA.A.2": {
      attempt_count: 0,
      fraction_of_hints_used: 0.0,
      time_on_task: 0,
      problem_completed: 0,
      student_answer_count: 0,
      main_skill: "Division",
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-12 p-0">
          <Caption />
        </div>
      </div>
      <div className="row">
        <div className="col-2 p-0">
          <SkillsList
            items={items}
            selectedTopic={selectedTopic}
            // onSelectTopic={setSelectedTopic}
            onSelectTopic={skillSelect}
          />
        </div>
        <div className="col-7 p-4">
          {selectedTopic === "Dashboard" ? (
            <Dashboard skillStats={skillStats} />
          ) : (
            <QuestionSection
              item={selectedTopic}
              updateStats={updateStats}
              skillStats={skillStats}
            />
          )}
        </div>
        {selectedTopic !== "Dashboard" && (
          <div className="col-3 p-4">
            {/* <InfoSection stats={skillStats[selectedTopic]} /> */}
            <InfoSection stats={skillStats[skillCodeMap[selectedTopic]]} />
          </div>
        )}
        {/* <div className="col-7 p-4">
          {selectedTopic === "Dashboard" ? (
            <Dashboard />
          ) : (
            <QuestionSection
              item={selectedTopic}
              updateStats={updateStats}
              skillStats={skillStats}
            />
          )}
        </div> */}
      </div>
    </>
  );
}
export default App;
