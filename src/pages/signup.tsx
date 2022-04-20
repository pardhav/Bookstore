import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Layout, SignupSchema } from "@/components";
import { useFormik } from "formik";
import { createUserWithEmail } from "@/modules";
import React from "react";

//TODO: Add validations to password, mobile number
//TODO: navigate to home on successful creation
function SignUp() {
  const toast = useToast();
  const [submitting, setSubmitting] = React.useState(false);
  // these fields values are defined according to WHATWG standard to support auto-fill in chrome
  const formik = useFormik({
    initialValues: {
      "given-name": "",
      "family-name": "",
      password: "",
      email: "",
      "tel-national": "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        setSubmitting(true);
        await createUserWithEmail(
          values.email,
          values.password,
          values["family-name"],
          values["given-name"],
          values["tel-national"]
        );
        toast({
          status: "success",
          position: "top",
          title: "Account Created!",
          description: `Welcome to NECT Family, ${values["family-name"]}`,
        });
      } catch (error: any) {
        toast({
          status: "error",
          position: "top",
          title: "Unknown Error Occurred!",
          description: error?.message,
        });
      } finally {
        actions.setSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <Layout title="NECT - SignUp" hideHeader>
      <Center boxShadow="md" w="100vw" h="100vh" m="auto">
        <Box w="800px" boxShadow="md" p="8" borderRadius="10">
          <Box mb="6">
            <Text
              fontFamily="Poppins, sans-serif"
              fontSize="3xl"
              fontWeight="medium"
            >
              Sign Up
            </Text>
            <Text
              fontFamily="Poppins, sans-serif"
              fontSize="md"
              color="gray.500"
            >
              Become a member to explore, shop from millions of books in just a
              few clicks
            </Text>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <FormControl
              p="3"
              isRequired
              isInvalid={
                formik.errors["email"] !== undefined &&
                formik.errors["email"] !== null &&
                formik.errors["email"] !== "" &&
                formik.touched.email
              }
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="example@mail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors["email"]}</FormErrorMessage>
            </FormControl>
            <FormControl
              m="3"
              isRequired
              isInvalid={
                formik.errors["password"] !== undefined &&
                formik.errors["password"] !== null &&
                formik.errors["password"] !== "" &&
                formik.touched.password
              }
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="at least 8 charecters"
              />
              <FormErrorMessage>{formik.errors["password"]}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors["given-name"] !== undefined &&
                formik.errors["given-name"] !== null &&
                formik.errors["given-name"] !== "" &&
                formik.touched["given-name"]
              }
              m="3"
            >
              <FormLabel htmlFor="given-name">First Name</FormLabel>
              <Input
                id="given-name"
                name="given-name"
                value={formik.values["given-name"]}
                placeholder="Enter you first name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors["given-name"]}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.errors["family-name"] !== undefined &&
                formik.errors["family-name"] !== null &&
                formik.errors["family-name"] !== "" &&
                formik.touched["family-name"]
              }
              m="3"
            >
              <FormLabel htmlFor="family-name">Last Name</FormLabel>
              <Input
                onBlur={formik.handleBlur}
                id="family-name"
                name="family-name"
                value={formik.values["family-name"]}
                placeholder="Enter your last name"
                type="text"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                {formik.errors["family-name"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                formik.errors["tel-national"] !== undefined &&
                formik.errors["tel-national"] !== null &&
                formik.errors["tel-national"] !== "" &&
                formik.touched["tel-national"]
              }
              m="3"
            >
              <FormLabel htmlFor="number">Mobile Number</FormLabel>
              <Input
                onBlur={formik.handleBlur}
                id="number"
                type="tel"
                name="tel-national"
                value={formik.values["tel-national"]}
                placeholder="(XXX)-XXX-XXXX"
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                {formik.errors["tel-national"]}
              </FormErrorMessage>
            </FormControl>

            <Flex justifyContent="flex-end" w="100%" pt="4">
              <Box>
                <Button type="submit" colorScheme="blue" isLoading={submitting}>
                  Submit
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Center>
    </Layout>
  );
}

export default SignUp;
