import React, { useContext } from "react";
import { Context } from "../App";
import Modal from "./Modal";

import styles from "../styles/startScreen.module.scss";

const Startscreen = () => {
  const { store, dispatch } = useContext(Context);
  return (
    <div className={`column centered ${styles.startScreen}`}>
      <h1>Hello</h1>
      <button
        onClick={() =>
          dispatch({ type: "SET_SHOW_START_MODAL", payload: true })
        }>
        Start
      </button>
      {store.showStartModal && <Modal />}
    </div>
  );
};

export default Startscreen;
