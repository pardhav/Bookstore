import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  useBoolean,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import {
  GET_ISBN_COVER_S,
  useGlobalContext,
  BookDetails,
  Works,
  GET_WORKS_INFO,
  GET_ISBN_INFO,
  isEmpty,
  addBookToCart,
  getBookDetails,
  IOpenLibraryDoc,
} from "@/modules";
import { bookDetail } from "modules/firebase/testResponse";
import { AiFillStar } from "react-icons/ai";

function BooksDetail() {
  const [fetchResult, setFetchResult] = React.useState({} as BookDetails);
  const [worksResult, setWorksResult] = React.useState({} as Works);
  const [firestoreResult, setFirestoreResult] = React.useState(
    {} as IOpenLibraryDoc
  );
  const [apiError, setApiError] = React.useState({} as any);
  const [isAdding, setAdding] = useBoolean();
  const toast = useToast();
  const router = useRouter();
  const context = useGlobalContext();
  const fetchBookDetail = async () => {
    try {
      if (isEmpty(router.query.book_id as string)) {
        context.state.showSpinner();
        const dataFromFirestore = await getBookDetails(
          router.query.book_id as string
        );
        setFirestoreResult(dataFromFirestore as IOpenLibraryDoc);
        // setFirestoreResult(bookDetail as any);
        console.log({ dataFromFirestore });

        const res = await axios({
          method: "GET",
          url: GET_ISBN_INFO(router.query.book_id as string),
        });
        console.log(res.data);
        setFetchResult(res.data);
        if (res.data.works && res.data.works.length > 0) {
          console.log("Getting Works results");
          const workIdAtZero = res.data.works[0].key;
          const workRes = await axios({
            method: "GET",
            url: GET_WORKS_INFO(workIdAtZero),
          });
          console.log(workRes.data);
          setWorksResult(workRes.data);
        }
        context.state.hideSpinner();
      }
    } catch (error) {
      setApiError(error);
    }
  };
  const addToCart = async () => {
    try {
      setAdding.on();
      if (context.state.user && context.state.user.uid) {
        await addBookToCart({
          title: firestoreResult.title,
          isbn: router.query.book_id,
          price: firestoreResult.price,
        });
        toast({
          status: "success",
          description: "Book Added to Cart",
          position: "top",
        });
      }
      setAdding.off();
    } catch (error) {}
  };

  React.useEffect(() => {
    console.log("----- USE EFFECT OF BOOK_ID ------");
    fetchBookDetail();
  }, [router.asPath]);
  return (
    <Layout>
      <Grid templateColumns="repeat(5, 1fr)" column={2}>
        <GridItem colSpan={2}>
          <Box maxW="400" maxH="600">
            <Image
              borderRadius="md"
              src={GET_ISBN_COVER_S(router.query.book_id as string)}
              width="250"
              height="400"
              alt={`ISBN ${router.query.book_id} cover`}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <VStack alignItems="flex-start">
            <HStack>
              <Text color={"gray.600"} fontSize={"md"}>
                {firestoreResult.average_rating}
              </Text>
              <span>
                <AiFillStar size={"20px"} color={"#4A5568"} />
              </span>
              <Text color={"gray.600"} fontSize={"md"}>
                {`(${firestoreResult.ratings_count})`}
              </Text>
            </HStack>

            <Heading fontFamily={"body"} fontWeight={500} fontSize={"3xl"}>
              {firestoreResult.title}
            </Heading>
            <Text
              fontSize={"2xl"}
              fontWeight={500}
            >{`$${firestoreResult.price}`}</Text>
            <Text
              fontSize={"lg"}
              fontWeight={500}
            >{`First Publish Date: ${firestoreResult.publication_date}`}</Text>
            <Text fontSize={"lg"} fontWeight={500}>
              {`Number of Pages ${firestoreResult.num_pages}`}
            </Text>
            <Text>{firestoreResult.publisher}</Text>
            {/* <Text>{firestoreResult.authors_array.join(", ")}</Text> */}
            <Text>
              {typeof worksResult.description === "object"
                ? (worksResult.description?.value as string)
                : worksResult.description}
            </Text>
            <Button
              isFullWidth
              isLoading={isAdding}
              onClick={() => {
                addToCart();
              }}
              colorScheme="blue"
            >
              Add to Cart
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Layout>
  );
}
export default BooksDetail;
