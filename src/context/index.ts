import React from 'react'
import { Question } from 'Types';

const INITIAL_STATE: Question[] = [];

const AppContext = React.createContext(INITIAL_STATE);

export const AppProvider = AppContext.Provider;
export default AppContext;
