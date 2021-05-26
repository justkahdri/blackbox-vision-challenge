import React from "react";
import {Question} from "Types";

type DefaultContext = {
  questions: Question[];
  points: number;
  setQuestions: (values: Question[]) => void;
  addPoints: (points: number) => void;
};

const INITIAL_STATE: DefaultContext = {
  questions: [],
  points: 0,
  addPoints: () => console.error("addPoints undefined"),
  setQuestions: () => console.error("setQuestions undefined"),
};

const AppContext = React.createContext(INITIAL_STATE);

export const AppProvider = AppContext.Provider;
export default AppContext;
