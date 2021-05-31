import React from "react";
import {Socket} from "socket.io-client";
import {Question} from "Types";

type DefaultContext = {
  questions: Question[];
  points: number;
  socket?: Socket;
  setQuestions: (values: Question[]) => void;
  addPoints: (points: number) => void;
  resetPoints: () => void;
};

const INITIAL_STATE: DefaultContext = {
  questions: [],
  points: 0,
  socket: undefined,
  addPoints: () => console.error("addPoints undefined"),
  resetPoints: () => console.error("addPoints undefined"),
  setQuestions: () => console.error("setQuestions undefined"),
};

const AppContext = React.createContext(INITIAL_STATE);

export const AppProvider = AppContext.Provider;
export default AppContext;
