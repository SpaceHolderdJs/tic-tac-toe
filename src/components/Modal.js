import React, { useContext, useState, useCallback } from "react";

import { Context } from "../App";

import styles from "../styles/modal.module.scss";

const Modal = () => {
  const [players, setPlayers] = useState({});
  const { store, dispatch } = useContext(Context);

  const submitUsers = useCallback(() => {
    dispatch({ type: "INIT_PLAYERS", payload: players });
    dispatch({ type: "SET_SHOW_START_MODAL", payload: false });
  }, [players]);

  return (
    <div className={`column centered ${styles.modalBackface}`}>
      <div className={`column centered ${styles.modal}`}>
        <h1>Introduce yourself</h1>
        <p>Player 1</p>
        <input
          type="text"
          onChange={(e) =>
            setPlayers({
              ...players,
              player0: { name: e.target.value, score: 0, mark: "x" },
            })
          }
        />
        <p>Player 2</p>
        <input
          type="text"
          onChange={(e) =>
            setPlayers({
              ...players,
              player1: { name: e.target.value, score: 0, mark: "o" },
            })
          }
        />
        <button onClick={() => submitUsers()}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
