import React from "react";
import { useSelector, useDispatch } from "react-redux";
//Components
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { Panel } from "../panel";
//Reducers
import { setMode, updateUbication } from "./../../reducers/userConfigSlice";
import { baseWorld, universe } from "./../../helpers/worldGenerator";
//Styles
import "./style.css";

export const ActionsShip = () => {
  const dispatch = useDispatch();
  const userConfig = useSelector((state) => state.aplicationConfig);

  const handleExplore = () => {
    if (userConfig.mode === "exploring") {
      dispatch(setMode("rest"));
      dispatch(updateUbication(baseWorld));
    } else {
      dispatch(setMode("exploring"));
      dispatch(updateUbication(universe));
    }
  };

  const options = () => {
    return (
      <div className="actionsShip">
        <HiOutlineRocketLaunch onClick={handleExplore} className={userConfig.mode === "exploring" ? "active" : ""} />
      </div>
    );
  };
  return <Panel content={options()} width={"45px"} height={"40px"} top={"auto"} bottom={"190px"} left={"50%"} right={"auto"} />;
};
