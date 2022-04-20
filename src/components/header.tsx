import { useGlobalContext } from "modules/context";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsCart3, BsInfoCircle } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

// TODO: prevent accidental renders, component now renders on every reload or key stroke
const Header = React.memo((props) => {
  const context = useGlobalContext();
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

        <Stack justifyContent="end">
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
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
});

export default Header;
