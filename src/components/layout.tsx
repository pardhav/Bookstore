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
      <Box>{props.children}</Box>
    </>
  );
}

export default Layout;
