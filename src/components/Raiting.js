import React, { useContext } from "react";

import { Context } from "../App";

import styles from "../styles/raiting.module.scss";

export default function Raiting() {
  const { store, dispatch } = useContext(Context);
  return (
    <div className={`column  ${styles.raiting}`}>
      <h1>Raiting</h1>
      {Object.values(store.players).map((player) => (
        <p>
          [{player.mark}] {player.name}: {player.score}
        </p>
      ))}
      <button onClick={() => window.location.reload()}>New game</button>
    </div>
  );
}
