import "./style.css";

export const Globe = ({ image }) => {
  return (
    <>
      <div className="globe-container" style={{ background: "url(" + image + ") top left no-repeat" }}>
        <div className="globe"></div>
      </div>
    </>
  );
};
