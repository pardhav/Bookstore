import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Header from "./header";

interface ILayoutProps {
  children?: React.ReactNode;
  title?: string;
  hideHeader?: boolean;
}
function Layout(props: ILayoutProps) {
  return (
    <>
      <Head>{props.title && <title>{props.title}</title>}</Head>
      {props.hideHeader ?? <Header />}
      <Box width={{ "2xl": "75%", xl: "75%" }} m="auto" border="1px solid red">
        {props.children}
      </Box>
    </>
  );
}

export default Layout;
