import "./style.css";

export const Nave = ({ image }) => {
  return <div className="background-nave w-50" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + image + ")" }}></div>;
};
