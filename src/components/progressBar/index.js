import "./style.css";

export const ProgressBar = ({ value, color }) => {
  return (
    <div className="container-progress-bar">
      <div className="progressBar" style={{ width: value + "%", backgroundColor: color }}></div>
    </div>
  );
};
