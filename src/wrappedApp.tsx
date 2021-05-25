import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Demo } from "./pages";

import theme from './theme';

const WrappedApp = (
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  </ChakraProvider>
);

export { WrappedApp };
