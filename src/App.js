import { createContext, useReducer } from "react";
import "./App.scss";
import Game from "./components/Game";

import Startscreen from "./components/StartScreen";

export const Context = createContext();

const reducer = (store, action) => {
  switch (action.type) {
    case "SET_SHOW_START_MODAL":
      return { ...store, showStartModal: action.payload };
    case "INIT_PLAYERS":
      console.log(action.payload);
      return { ...store, players: action.payload };
    case "INIT_FIELDS":
      return { ...store, fields: action.payload };
    case "SET_CURRENT_PLAYER":
      return { ...store, currentPlayer: action.payload };
    case "SET_WIN_VARIATION":
      return { ...store, winVariation: action.payload };
    default:
      return store;
  }
};

const winningVariations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [store, dispatch] = useReducer(reducer, {
    showStartModal: false,
    currentPlayer: 0,
    fields: [],
  });

  return (
    <Context.Provider value={{ store, dispatch, winningVariations }}>
      <div className="App">{!store.players ? <Startscreen /> : <Game />}</div>
    </Context.Provider>
  );
}

export default App;
