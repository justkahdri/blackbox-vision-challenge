import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages";

import theme from './theme';

const WrappedApp = (
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Home} />
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);

export { WrappedApp };
