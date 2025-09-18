// this component shows the metadata info fetched from the user interaction
// out of all these columns from the pdets and plogs file, we needed only 6 features
// # of attempts, time on task, hints used, problem completed, answer counts, main skill code

// Attempt Count: how many attempts it took for the user to get to a correct attempt
// longstory short, since there are total 3 questions, we divide the total attempts in the end by 3
// attempt counts that lead to these outputs:
// ≤ 1.1	-> strong
// 1.2–1.5 -> average
// > 1.5	-> weak
// problem completed: the backend accepts the value ranging from 0.00-1.00. this is the percentage (out of 1 instead of 100) of correct attempts from total
// so total corect attempts/total number of questions which is 3

// all of these are divided by 3 in the end (when the daashboard tab is clicked.)
// when the dashboard tab is clicked, the entire metadata is sent to the backend
// and before sending the division by 3 is done (for attempt counts and problem completed) and then sent

// the importance level of the features are as follows:
// feature importance:
// attempt_count            : 0.942
// problem_completed        : 0.027
// main_skill_enc           : 0.010
// fraction_of_hints_used   : 0.009
// student_answer_count     : 0.007
// time_on_task             : 0.005
// the most sensitive ones are attempt counts and problem completed

import "./InfoSection.css";

// chatgpt code for storing all the data from user interaction starts here
interface InfoSectionProps {
  stats: {
    attempt_count: number;
    fraction_of_hints_used: number;
    time_on_task: number;
    problem_completed: number;
    student_answer_count: number;
    main_skill: string;
  };
}
// chatgpt code for storing all the data from user interaction ends here

function InfoSection({ stats }: InfoSectionProps) {
  const skillCodeMap: Record<string, string> = {
    Addition: "1.OA.A.1",
    Subtraction: "1.OA.C.6",
    Multiplication: "3.OA.A.1",
    Division: "3.OA.A.2",
  };

  const skillCode = skillCodeMap[stats.main_skill];
  return (
    <>
      <div className="info-container">
        <div className="header-container">
          <center>
            <h2>Skill Stats</h2>
          </center>
        </div>
        <div className="content-container">
          <p>
            <b>Number of Attempts:</b> {stats.attempt_count}
          </p>
          <p>
            <b>Time on this Assignment:</b> {stats.time_on_task.toFixed(2)}
          </p>
          <p>
            <b>Number of Hints used:</b> {stats.fraction_of_hints_used}
          </p>
          <p>
            <b>Problem Completed:</b> {stats.problem_completed}
          </p>
          <p>
            <b>Answer Counts:</b> {stats.student_answer_count}
          </p>
          <p>
            {/* <b>Main Skill Code:</b> {stats.main_skill} */}
            <b>Main Skill Code:</b> {skillCode}
          </p>
        </div>
      </div>
    </>
  );
}
export default InfoSection;
