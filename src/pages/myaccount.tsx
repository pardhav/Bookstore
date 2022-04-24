import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout } from "components/Layout";

export default function MyAccount(): JSX.Element {
  return (
    <Layout>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={8}
          w={"full"}
          maxW={"xl"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={8}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "xl" }}>
            My Account
          </Heading>
          <form>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-around"}
              alignItems={"baseline"}
              spacing={4}
            >
              <FormControl id="firstName" mr={6}>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="First Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
            </Stack>

            <FormControl id="email" isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <FormControl id="lastName" mt={4} isRequired>
              <FormLabel>Street</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="lastName" mt={4} isRequired>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-around"}
              alignItems={"baseline"}
              mt={4}
            >
              <FormControl id="lastName" isRequired mr={6}>
                <FormLabel>State</FormLabel>
                <Input
                  placeholder="Last Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Zip/Postal Code</FormLabel>
                <Input
                  placeholder="Last Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
            </Stack>

            <Stack spacing={6} direction={["column", "row"]} mt={12}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Layout>
  );
}
