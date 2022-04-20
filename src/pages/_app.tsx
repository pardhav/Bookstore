import type { AppProps } from "next/app";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "styles/theme";
import React from "react";
import { GlobalContext } from "@/modules";

function MyApp({ Component, pageProps }: AppProps) {
  const [showHeader, setShowHeader] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleHeader = () => setShowHeader((val) => !val);
  return (
    <GlobalContext.Provider
      value={{
        state: {
          showHeader,
          toggleHeader,
          spinnerStatus: isOpen,
          showSpinner: onOpen,
          hideSpinner: onClose,
        },
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
