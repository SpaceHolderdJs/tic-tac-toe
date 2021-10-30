import React from "react";
import Playground from "./Playground";
import Raiting from "./Raiting";

import styles from "../styles/game.module.scss";

const Game = () => {
  return (
    <div className={`row centered ${styles.game}`}>
      <div className={`row centered shadow ${styles.wrapper}`}>
        <Playground />
        <Raiting />
      </div>
    </div>
  );
};

export default Game;
