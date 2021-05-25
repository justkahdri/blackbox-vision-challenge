import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {Question} from "Types";

import {Home, Quiz, Layout} from "./pages";
import theme from "./theme";
import {AppProvider} from "./context";

const App = () => {
  const initialState: Question[] = [];
  const [state, setState] = React.useState(initialState);

  const modifyContext = (values: Question[]) => setState(values);
  const defaultContext = {questions: state, setQuestions: modifyContext};

  return (
    <ChakraProvider theme={theme}>
      <AppProvider value={defaultContext}>
        <React.StrictMode>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Quiz} path="/quiz" />
                <Route exact component={Quiz} path="/quiz/:questionId" />
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
