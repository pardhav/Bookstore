import React from "react";
import { Layout } from "@/components";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import GlobalContext from '../context';

function Login() {
  const context = React.useContext(GlobalContext);
  const [showPassword, setShowPassword] = React.useState(false);
  React.useState(() => {
    console.log(context);
    context.showHeader
})
  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <Layout>
      <Center h="100vh">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            borderRadius={12}
            p={8}
          >
            <Box
              minW={{ base: "90%", md: "468px" }}
              borderRadius={10}
              border={1}
              backgroundColor="whiteAlpha.900"
              p={8}
            >
              <Heading color="teal.400">Login</Heading>

              <form>
                <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <EmailIcon />
                      </InputLeftElement>
                      <Input type="email" placeholder="Enter your Email" />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <LockIcon />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
              <Center>
                New to user?
                <Link color="teal.500" href="#">
                  Sign Up
                </Link>
              </Center>
            </Box>
          </Stack>
      </Center>
    </Layout>
  );
}

export default Login;