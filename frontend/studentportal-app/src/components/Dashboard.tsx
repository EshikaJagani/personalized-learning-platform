// this component displays the dashboard
// when this tab is clicked, the entire metadata for each skill gets sent to the backend
// the backend uses the ML model trained on the data for students (covered in ML part)
// and responds with giving predictions whether the performance on the skill was weak, average or strong
// further, for the weak skills, function for ollama is called (through the backend)
// which responds with links for the weak topics.
// for the average and strong topics, Well Done! msg is displayed
// table structure from Bootstrap: https://getbootstrap.com/docs/5.3/content/tables/
// coded from past experience in Flutter, watched videos and took help from chatgpt to understand the structure and code here..

import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface DashboardProps {
  skillStats: Record<
    string,
    {
      attempt_count: number;
      fraction_of_hints_used: number;
      time_on_task: number;
      problem_completed: number;
      student_answer_count: number;
      main_skill: string;
    }
  >;
}

interface Resource {
  title: string;
  url: string;
}

function Dashboard({ skillStats }: DashboardProps) {
  const [predictions, setPredictions] = useState<
    Record<string, { prediction: string }>
  >({});

  const [resources, setResources] = useState<Record<string, Resource[]>>({});

  const [loading, setLoading] = useState(true);

  const fetchOllamaResources = async (skillName: string) => {
    try {
      const res = await axios.post(
        // "http://20.57.121.241:8000/resources",
        // "https://20.57.121.241:8000/resources",
        // "https://5f51739ac204.ngrok-free.app/resources",
        "https://241835e8ca8e.ngrok-free.app/resources",
        { skills: [skillName] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // chatgpt code starts here
      const newResource = res.data[skillName];

      setResources((prev) => ({
        ...prev,
        [skillName]: newResource,
      }));
      // chatgpt code ends here
    } catch (error) {
      console.error(`Ollama failed for ${skillName}:`, error);
    }
  };

  // chatgpt code starts here
  useEffect(() => {
    const fetchPredictions = async () => {
      for (const skillCode in skillStats) {
        const original = skillStats[skillCode];

        const payload = {
          ...original,
          main_skill_enc: skillCode,
          // dividing the total attempt_count by 3 before sending
          // doing the same for problem completed
          attempt_count: parseFloat((original.attempt_count / 3).toFixed(2)),
          problem_completed: parseFloat(
            (original.problem_completed / 3).toFixed(2)
          ),
        };
        // chatgpt code ends here

        try {
          const response = await axios.post(
            "https://studentportalbackendcontainer.blackground-b6d5fd48.eastus2.azurecontainerapps.io/predict",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // chatgpt code starts here
          const skillName = original.main_skill;

          setPredictions((prev) => ({ ...prev, [skillName]: response.data }));

          if (response.data.prediction === "weak") {
            fetchOllamaResources(skillName);
          }
          // chatgpt code ends here
        } catch (error) {
          console.error(`Failed for ${skillCode}`, error);
        }
      }
      setLoading(false);
    };

    setLoading(false);

    fetchPredictions();
  }, [skillStats]);

  return (
    <>
      <div className="dashboard-container">
        <div className="title-container">
          <center>
            <h2>Dashboard</h2>
            <p>(Please wait for 5 minutes..)</p>
          </center>
        </div>
        <div>
          <center>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Topic Name</th>
                  <th scope="col">Skill Strength</th>
                  <th scope="col">Learning Resource Links</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(predictions).map(([topic, { prediction }]) => (
                  <tr key={topic}>
                    <th>{topic}</th>
                    <td>
                      {prediction === "weak" && "🔴 Weak Topic"}
                      {prediction === "average" && "🟡 Average Topic"}
                      {prediction === "strong" && "🟢 Strong Topic"}
                    </td>

                    <td>
                      {prediction === "weak" ? (
                        resources[topic]?.length > 0 ? (
                          <ul>
                            {resources[topic].map((res, index) => (
                              <li key={index}>
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {res.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "Fetching Links..."
                        )
                      ) : (
                        "Well Done!"
                      )}
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <th>Addition</th>
                  <td>
                    <a href="https://www.google.com">google.com</a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
