import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "styles/theme";
import GlobalContext,{defaultState} from "../context";
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [showHeader, setShowHeader] = React.useState(false);
  const toggleHeader = () => setShowHeader(!showHeader);
  return (
    <GlobalContext.Provider
      value={{ state: { showHeader, toggleHeader } }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
