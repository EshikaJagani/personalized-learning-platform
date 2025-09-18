// this component consists of the code for the sidebar created for showing list of skills
// sidebar video tutorial: https://www.youtube.com/watch?v=0lQtoOaBHIo
import "./SkillsList.css";

interface SkillsListProps {
  items: string[];
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}
function SkillsList({ items, selectedTopic, onSelectTopic }: SkillsListProps) {
  return (
    // bootstap code for list-group
    <div className="list-group list_container">
      {items.map((item) => (
        <div
          key={item}
          className={`container_1 ${
            selectedTopic === item ? "selected_topic" : ""
          }`}
          onClick={() => onSelectTopic(item)}
        >
          <div className="skill_1">
            <h4>{item}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SkillsList;
