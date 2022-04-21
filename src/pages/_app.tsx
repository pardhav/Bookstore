import type { AppProps } from "next/app";
import { ChakraProvider, useBoolean, useDisclosure } from "@chakra-ui/react";
import theme from "styles/theme";
import React from "react";
import { GlobalContext, FIREBASE_AUTH } from "@/modules";
import { onAuthStateChanged } from "firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [showHeader, setShowHeader] = useBoolean();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toggleHeader = () => setShowHeader((val) => !val);
  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    setShowHeader.on();
  });
  return (
    <GlobalContext.Provider
      value={{
        state: {
          showHeader,
          toggleHeader: setShowHeader.toggle,
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
