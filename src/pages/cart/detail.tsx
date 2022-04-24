import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "@/components";
import React from "react";
import {
  fetchCartDetails,
  GET_ISBN_COVER_S,
  useGlobalContext,
  updateCartQuantity,
  FIREBASE_AUTH,
} from "@/modules";
import { testCartData } from "modules/firebase/testResponse";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

//dp_buyer_pp_US_1650783977532505@paypal.com
//kbH7Fz(mjDj@$QW
import { BsTrash } from "react-icons/bs";
import PaypalButtons from "./paypalButtons";
interface ICartData {
  title: string;
  price: number;
  quantity: number;
  isbn: string;
}
function Detail() {
  const context = useGlobalContext();
  const [cartData, setCartData] = React.useState([] as any);
  const [totals, setTotals] = React.useState({} as any);
  const fetchCartData = async () => {
    console.log("Fetching DATA");
    console.log(context?.state?.user?.uid);
    console.log(FIREBASE_AUTH.currentUser?.uid);
    if (context?.state?.user && context?.state?.user.uid) {
      const data = await fetchCartDetails(context?.state?.user.uid);
      console.log({ data });
      setCartData(data);
      console.log({ data });
      console.log(Object.values(data));
      let total = 0;
      // Object.values(data).forEach((data: ICartData) => {
      //   total = total + data.price * data.quantity;
      // });
      let tempTotals = {} as any;
      tempTotals.subTotal = total;
      tempTotals.taxes = total * (6.25 / 100);
      tempTotals.shipping = 4.99;
      tempTotals.totalBeforeTax = total + 4.99;
      tempTotals.mainTotal = total + 4.99 + total * (6.25 / 100);
      setTotals(tempTotals);
    }
  };
  const updateQuantity = async (isbn: string, newValue: string) => {
    await updateCartQuantity(
      context?.state?.user?.uid as string,
      isbn,
      newValue
    );
  };
  React.useEffect(() => {
    console.log(window);
    if (typeof window !== "undefined") {
      console.log("--- USE EFFECT of CART -----");
      fetchCartData();
    }
  }, []);
  return (
    <>
      <Layout>
        <>
          <Grid templateColumns="repeat(5, 1fr)" column={2}>
            <GridItem colSpan={3}>
              <Heading
                fontFamily={"heading"}
                fontSize={"2xl"}
                fontWeight={"extrabold"}
              >
                Shopping Cart
              </Heading>
              {cartData && Object.values(cartData).length > 0 && (
                <VStack spacing={6} mt={10}>
                  {Object.keys(cartData)?.map(
                    (cartId: string, index: number) => {
                      const item = cartData[cartId];
                      return (
                        <Box w={"100%"} key={index}>
                          <HStack
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <HStack w={"full"}>
                              <Box
                                width="125px"
                                height="125px"
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                <Image
                                  borderRadius="lg"
                                  src={GET_ISBN_COVER_S(item.isbn)}
                                  maxWidth="125"
                                  maxHeight="125"
                                  alt={`ISBN ${item.isbn} cover`}
                                  objectFit={"cover"}
                                />
                              </Box>

                              <Text
                                fontSize={"md"}
                                fontFamily={"body"}
                                fontWeight={"medium"}
                              >{`${item.title}`}</Text>
                            </HStack>
                            <HStack
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              w={"full"}
                            >
                              <Box>
                                <Select
                                  defaultValue={item.quantity}
                                  onChange={async (
                                    event: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    console.log(
                                      `selected value: ${event.target.value}`
                                    );
                                    // if (item.quantity !== event.target.value) {
                                    //   await updateQuantity(
                                    //     cartId,
                                    //     event.target.value
                                    //   );
                                    // }
                                    console.log("select clicked");
                                  }}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                </Select>
                              </Box>

                              <Text
                                fontWeight={"medium"}
                                color={"gray.700"}
                              >{`$${item.price}`}</Text>
                              <IconButton
                                aria-label="Search database"
                                icon={<BsTrash color="red" />}
                              />
                            </HStack>
                          </HStack>
                        </Box>
                      );
                    }
                  )}
                </VStack>
              )}
            </GridItem>
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={1}>
              <Center h={"75%"} mt={10}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  borderRadius={"lg"}
                  borderWidth={"1px"}
                  padding={8}
                  width={"full"}
                >
                  <Heading fontWeight={"bold"} fontSize={"xl"} lineHeight={1.2}>
                    Order Summary
                  </Heading>
                  <Box marginTop={8} display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Text fontWeight={"medium"} color={"gray.600"}>
                        Subtotal
                      </Text>
                      <Text
                        fontWeight={"medium"}
                        color={"gray.600"}
                      >{`$${totals.subTotal}`}</Text>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Text fontWeight={"medium"} color={"gray.600"}>
                        Shipping Charges
                      </Text>
                      <Text
                        fontWeight={"medium"}
                        color={"gray.600"}
                      >{`$${totals.shipping}`}</Text>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Text fontWeight={"medium"} color={"gray.600"}>
                        Total Before Taxes
                      </Text>
                      <Text
                        fontWeight={"medium"}
                        color={"gray.600"}
                      >{`$${totals.totalBeforeTax}`}</Text>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Text fontWeight={"medium"} color={"gray.600"}>
                        Taxes
                      </Text>
                      <Text
                        fontWeight={"medium"}
                        color={"gray.600"}
                      >{`$${totals.taxes}`}</Text>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mt={6}
                    >
                      <Text fontWeight={"semibold"} fontSize={"lg"}>
                        Total
                      </Text>
                      <Text
                        fontWeight={"semibold"}
                        fontSize={"lg"}
                      >{`$${totals.mainTotal}`}</Text>
                    </Box>
                  </Box>
                  <Box mt={8}>
                    <PaypalButtons amount={totals.mainTotal} />
                  </Box>
                </Box>
              </Center>
            </GridItem>
          </Grid>
        </>
      </Layout>
    </>
  );
}

export default Detail;
