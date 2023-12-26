import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatShip, setMode, addLog, updateUbication } from "./../../reducers/userConfigSlice";
import { Panel } from "./../panel";
//Functions
import { getRandomInt } from "./../../helpers/functions";
import { newShip } from "./../../helpers/shipGenerator";
import { newWorld, baseWorld } from "./../../helpers/worldGenerator";
import { Battle } from "../battle";

export const Events = () => {
  const dispatch = useDispatch();
  const aplicationConfig = useSelector((state) => state.aplicationConfig);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [opponent, setOpponent] = useState(null);

  const Explore = () => {
    return (
      <div className="text-white p-2 w-100">
        <div className="center font-40 mt-30">
          {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds}
        </div>
        <div className="text-white center font-20 mt-10">Explorando</div>
      </div>
    );
  };

  //TRIGGERS
  useEffect(() => {
    if (opponent !== null) setSeconds(0);

    //10s = combustible-1
    if (seconds % 10 === 0 && opponent === null) dispatch(updateStatShip({ key: "combustible", data: aplicationConfig.ship.combustible - 1 }));

    //Combustible = 5 (low energy) => Go Station
    if (aplicationConfig.ship.combustible === 5 || aplicationConfig.ship.escudos < 1) {
      dispatch(setMode("rest"));
      dispatch(updateUbication(baseWorld));
    }

    //Found event
    let secondsTarget = getRandomInt(40, 35);
    if (seconds % secondsTarget === 0 && opponent === null && aplicationConfig.ubication.name === "Espacio") {
      let probability = getRandomInt(0, 5);
      console.log("Nuevo evento");
      //Found new ubication
      if (probability < 2) {
        console.log("Ubicación encontrada");
        let ubication = newWorld();
        dispatch(updateUbication(ubication));
        dispatch(setMode("exploreWorld"));
        setSeconds(0);
        setMinutes(0);
      }
      //Found opponent
      else {
        console.log("Oponente encontrado");
        setOpponent(newShip());
        setSeconds(0);
        setMinutes(0);
      }
    }
  }, [seconds]);

  //TIME COUNTER
  useEffect(() => {
    dispatch(
      addLog({
        name: aplicationConfig.ship.name,
        text1: "Hemos establecido curso de hiperespacio en busca de nuevas oportunidades.",
        quantity: "",
        text2: "",
        type: "world",
      })
    );
    setOpponent(null);
    let secondsLimit = 0;
    const interval = setInterval(() => {
      secondsLimit++;
      if (secondsLimit > 59) {
        setSeconds(0);
        setMinutes((minutes) => minutes + 1);
        secondsLimit = 0;
      } else {
        setSeconds((seconds) => seconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Panel
      content={
        opponent === null ? (
          <div className="flex100">
            <Explore />
          </div>
        ) : (
          <div className="flex100">
            <Battle ship={aplicationConfig.ship} opponent={opponent} setOpponent={setOpponent} />
          </div>
        )
      }
      width={opponent === null ? "400px" : "650px"}
      height={opponent === null ? "250px" : "340px"}
      top={"40%"}
      bottom={""}
      left={"50%"}
      right={""}
      transform={"translate(-50%, -50%)"}
    />
  );
};
