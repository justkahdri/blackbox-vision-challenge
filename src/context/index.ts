import React from "react";
import {Question} from "Types";

type DefaultContext = {
  questions: Question[];
  setQuestions: (values: Question[]) => void;
};

const INITIAL_STATE: DefaultContext = {
  questions: [],
  setQuestions: () => console.error("setQuestions undefined"),
};

const AppContext = React.createContext(INITIAL_STATE);

export const AppProvider = AppContext.Provider;
export default AppContext;
