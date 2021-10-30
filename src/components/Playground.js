import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "../styles/playground.module.scss";
import Playgrounditem from "./PlaygroundItem";

import { Context } from "../App";

export default function Playground() {
  const { store, dispatch } = useContext(Context);
  const [winLineStyles, setWinLineStyles] = useState({});

  const initGame = useCallback((size = 3) => {
    const fields = [];
    for (let i = 0; i < size * size; i++) {
      fields.push({ n: i, mark: "" });
    }
    console.log(fields);
    dispatch({ type: "INIT_FIELDS", payload: fields });
  }, []);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    console.log(store.winVariation);
  }, [store.winVariation]);

  //placing line

  useEffect(() => {
    switch (store.winVariation?.join("")) {
      case "012":
        return setWinLineStyles({
          top: "17%",
        });

      case "345":
        return setWinLineStyles({
          top: "50%",
        });

      case "678":
        return setWinLineStyles({
          top: "83%",
        });

      case "048":
        return setWinLineStyles({
          top: "50%",
          transform: "rotateZ(45deg)",
        });

      case "246":
        return setWinLineStyles({
          top: "50%",
          transform: "rotateZ(-45deg)",
        });

      case "036":
        return setWinLineStyles({
          right: "35%",
          transform: "rotateZ(90deg)",
        });
      case "147":
        return setWinLineStyles({
          transform: "rotateZ(90deg)",
        });
      case "258":
        return setWinLineStyles({
          left: "33%",
          transform: "rotateZ(90deg)",
        });

      default:
        setWinLineStyles({ background: "blue" });
    }
    console.log(store.winVariation?.join(""));
  }, [store.winVariation]);

  const winLine = (
    <div className={styles.winLine} style={{ ...winLineStyles }}></div>
  );

  return (
    <div className={`row centered ${styles.playground}`}>
      {store.winVariation && winLine}
      {store.fields.map((_, indx) => (
        <Playgrounditem n={indx} initGame={initGame} key={indx} />
      ))}
    </div>
  );
}
