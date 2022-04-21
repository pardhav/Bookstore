import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsCart3, BsInfoCircle } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { useAuthState, FIREBASE_AUTH } from "@/modules";
import { signOut } from "firebase/auth";

// TODO: prevent accidental renders, component now renders on every reload or key stroke
const Header = React.memo((props) => {
  const user = useAuthState();
  const router = useRouter();
  return (
    <Box as="header">
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
            <Link href="/">Book Store</Link>
          </Heading>
        </Flex>
        <Box maxW="lg" justifyContent="center" flex="1">
          <SearchBar />
        </Box>

        <HStack justifyContent="end">
          {user !== null ? (
            <>
              <Text pr={5}>Welcome, {user.displayName}</Text>
              <Menu closeOnSelect>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Options
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<BsCart3 />}
                    onClick={() => router.push("/cart/detail")}
                  >
                    Cart
                  </MenuItem>
                  <MenuItem icon={<FiBox />}>Orders</MenuItem>
                  <MenuItem icon={<BsInfoCircle />}>About</MenuItem>

                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      signOut(FIREBASE_AUTH);
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
});

Header.displayName = "Header";
export default Header;
