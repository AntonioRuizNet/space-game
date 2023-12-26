import React from "react";
import { useSelector } from "react-redux";
//Components
import { Panel } from "./components/panel";
import "./App.css";
//Helpers
import { ship } from "./helpers/shipGenerator";
import { ActionsShip } from "./components/actionsShip";
import { FichaNave } from "./components/fichaNave";
import { FichaUbicacion } from "./components/fichaUbicacion";
import { Events } from "./components/events";
import { ExploreSpace } from "./components/exploreSpace";
import { Hangar } from "./components/hangar";
import { Chat } from "./components/chat";
import { Inventario } from "./components/inventario";
import { ExploreWorld } from "./components/exploreWorld";

function App() {
  const userConfig = useSelector((state) => state.aplicationConfig);

  return (
    <div
      className={userConfig.mode !== "exploring" ? "background-image" : ""}
      style={{ backgroundImage: "url(" + userConfig.ubication.background + ")" }}
    >
      {userConfig.mode === "exploreWorld" && (
        <div className={"background-image slowZoom-animation"} style={{ backgroundImage: "url(" + userConfig.ubication.background + ")" }}></div>
      )}
      <Panel content={<Chat />} width={"350px"} height={"130px"} top={"auto"} bottom={"190px"} left={"0"} right={"auto"} />
      <ActionsShip />
      <Panel content={<Inventario />} width={"350px"} height={"130px"} top={"auto"} bottom={"190px"} left={"auto"} right={"0"} />
      <Panel
        content={
          <div className="flex100">
            <FichaUbicacion data={userConfig.ubication} />
            <div style={{ width: "20%" }}></div>
            <FichaNave ship={ship} />
          </div>
        }
        width={"100%"}
        height={"180px"}
        top={"auto"}
        bottom={"0"}
        left={"0"}
        right={"auto"}
      />

      {userConfig.mode === "rest" && (
        <Panel
          content={<Hangar />}
          width={"300px"}
          height={"55px"}
          top={"40%"}
          bottom={""}
          left={"50%"}
          right={""}
          transform={"translate(-50%, -50%)"}
        />
      )}

      {userConfig.mode === "exploreWorld" && (
        <Panel
          content={<ExploreWorld />}
          width={"300px"}
          height={"55px"}
          top={"40%"}
          bottom={""}
          left={"50%"}
          right={""}
          transform={"translate(-50%, -50%)"}
        />
      )}

      {userConfig.mode === "exploring" && (
        <>
          <ExploreSpace />
          <Events />
        </>
      )}
    </div>
  );
}

export default App;
