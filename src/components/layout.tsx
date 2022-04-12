import { Box } from "@chakra-ui/react";
import React from "react";
import Header from './header';

interface ILayoutProps {
  children?: React.ReactNode;
}
function Layout(props: ILayoutProps) {
  return (
    <>
      <Header/>
      <Box>{props.children}</Box>
    </>
  );
}

export default Layout;
