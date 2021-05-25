import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { Home, Quiz, Layout } from "./pages";

import theme from './theme';
import { AppProvider } from "./context";

const WrappedApp = (
  <ChakraProvider theme={theme}>
    <AppProvider value={[]}>
      <React.StrictMode>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/quiz" component={Quiz} />
              <Route component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </React.StrictMode>
    </AppProvider>
  </ChakraProvider>
);

export { WrappedApp };
