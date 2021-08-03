import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {Question} from "Types";

import {Home, Quiz, Layout, QuestionBox, QuizEnd} from "./pages";
import theme from "./theme";
import {AppProvider} from "./context";

const App = () => {
  const initialState = {
    questions: [],
    points: 0,
  };
  const [state, setState] = React.useState<{questions: Question[]; points: number}>(initialState);

  const setQuestions = (values: Question[]) => setState({...state, questions: values});
  const addPoints = (new_points: number) => setState({...state, points: state.points + new_points});
  const resetPoints = () => setState({...state, points: 0});
  const defaultContext = {...state, setQuestions, addPoints, resetPoints};

  return (
    <ChakraProvider theme={theme}>
      <AppProvider value={defaultContext}>
        <React.StrictMode>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Quiz} path="/quiz" />
                <Route exact component={QuestionBox} path="/quiz/:questionId" />
                <Route exact component={QuizEnd} path="/end" />
                <Route component={Home} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </React.StrictMode>
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
