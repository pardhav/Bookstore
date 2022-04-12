import { useGlobalContext } from "@/context";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
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
      alignItems="flex-start"
      pt={3}
      pb={3}
      pl={8}
      pr={8}
      boxShadow="md"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
          fontWeight="normal"
        >
          Book Store
        </Heading>
      </Flex>
      <Box maxW="lg" justifyContent="center" flex="1">
        <InputGroup>
          <InputLeftElement pointerEvents="none" color="gray.300">
            <SearchIcon />
          </InputLeftElement>
          <Input variant="filled" placeholder="Search the store" maxW="lg" />
        </InputGroup>
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="end"
      >
        <Text>Header Buffer:{ String(context.state.showHeader)}</Text>
        <Button variant="outline">Create account</Button>
      </Stack>
    </Flex>
  );
}

export default Header;
