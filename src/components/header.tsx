import { useGlobalContext } from "@/context";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";

interface IHeader {
  hideActions: boolean;
}
function Header(props: any) {
  const context = useGlobalContext();
  console.log(context);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      pt={2}
      pb={2}
      pl={8}
      pr={8}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5} flex="1">
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Book Store
        </Heading>
      </Flex>
      <Stack
        direction={{ base: "column", md: "row" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
        justifyContent="end"
      >
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        >
          Create account
        </Button>{" "}
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        >
          Create account
        </Button>{" "}
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        >
          Create account
        </Button>
      </Stack>
    </Flex>
  );
}

export default Header;
