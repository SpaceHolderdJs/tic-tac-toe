import React, { useState, useContext, useCallback, useEffect } from "react";

import styles from "../styles/playgroundItem.module.scss";

import { Context } from "../App";

const Playgrounditem = ({ n, initGame }) => {
  const { store, dispatch, winningVariations } = useContext(Context);

  const [filled, setFilled] = useState(false);

  useEffect(() => {
    setFilled(store.fields[n].mark || false);
  }, [store.fields]);

  const handleClick = useCallback(() => {
    if (filled) return;

    const playersArr = Object.values(store.players);

    setFilled(playersArr[store.currentPlayer].mark);

    dispatch({
      type: "SET_CURRENT_PLAYER",
      payload: store.currentPlayer === 0 ? 1 : 0,
    });

    const fields = store.fields;
    store.fields.splice(n, 1, {
      n,
      mark: playersArr[store.currentPlayer].mark,
    });
    console.log("!!!", fields);

    dispatch({ type: "INIT_FIELDS", payload: fields });
  }, [store.players, store.currentPlayer, filled, store.fields]);

  useEffect(() => {
    store.fields.filter((field) => field.mark !== "").length > 4 &&
      checkWinner();
  }, [store.fields, filled]);

  const checkWinner = useCallback(() => {
    const playersArr = Object.values(store.players);
    const currentPlayer = playersArr[store.currentPlayer === 0 ? 1 : 0];
    const score = currentPlayer.score;

    const fields = store.fields.filter(
      (field) => field.mark === currentPlayer.mark
    );
    console.log("***", fields);

    const clearFields = (time = 2000) => {
      setTimeout(() => {
        dispatch({ type: "SET_WIN_VARIATION", payload: null });
        initGame();
      }, time);
      //   initGame();
    };

    const win = () => {
      const keyOfPlayer = playersArr.findIndex(
        (player) => player.mark === currentPlayer.mark
      );
      console.log(keyOfPlayer);

      dispatch({
        type: "INIT_PLAYERS",
        payload: {
          ...store.players,
          [`player${keyOfPlayer}`]: {
            ...store.players[`player${keyOfPlayer}`],
            score: score + 1,
          },
        },
      });

      clearFields(2000);
    };

    const emptyFields = store.fields.filter((field) => field.mark === "");

    const isDraw = () => {
      const firstPlayerFields = store.fields.filter(
        (field) => field.mark === playersArr[0].mark
      );
      const secondPlayerFields = store.fields.filter(
        (field) => field.mark === playersArr[1].mark
      );

      winningVariations.every((variation) => {
        return (
          !variation.every((number) =>
            firstPlayerFields.find((field) => field.n === number)
          ) &&
          !variation.every((number) =>
            secondPlayerFields.find((field) => field.n === number)
          )
        );
      }) && clearFields(2000);
    };

    if (emptyFields.length < 3) {
      isDraw();
    }

    if (emptyFields.length === 0) return clearFields(2000);

    winningVariations.forEach((variation) => {
      if (
        variation.every((number) => fields.find((field) => field.n === number))
      ) {
        dispatch({ type: "SET_WIN_VARIATION", payload: variation });
        win();
      }
    });
  }, [store.fields, store.currentPlayer, store.players, filled]);

  const x = (
    <div className={`column centered ${styles.x}`}>
      <div className={styles.lineL}></div>
      <div className={styles.lineR}></div>
    </div>
  );

  const o = <div className={styles.o}></div>;

  return (
    <div
      className={`column centered ${styles.playgroundItem}`}
      onClick={() => handleClick()}>
      {filled && (filled === "o" ? o : x)}
    </div>
  );
};

export default Playgrounditem;
