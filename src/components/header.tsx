import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
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
import { useGlobalContext, signOutUser } from "@/modules";

// TODO: prevent accidental renders, component now renders on every reload or key stroke
const Header = React.memo((props) => {
  const router = useRouter();
  const context = useGlobalContext();
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

        <Box display="flex" justifyContent="end">
          {context.state.isLoggedIn ? (
            <>
              <Menu isLazy closeOnSelect={true}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    alignItems="baseline"
                    m={2}
                  >
                    <Avatar
                      name={`${context.state.user?.displayName as string}`}
                      size="sm"
                      mr="3"
                    />
                    <Text fontWeight="normal">
                      {context.state.user?.displayName}
                    </Text>
                  </Box>
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
                    onClick={async () => {
                      await signOutUser();
                      console.log("Signed Out!");
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
});

Header.displayName = "Header";
export default Header;
