import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
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
} from "@/modules";

function BooksDetail() {
  const [fetchResult, setFetchResult] = React.useState({} as BookDetails);
  const [worksResult, setWorksResult] = React.useState({} as Works);
  const [apiError, setApiError] = React.useState({} as any);
  const router = useRouter();
  const context = useGlobalContext();
  const fetchBookDetail = async () => {
    try {
      if (isEmpty(router.query.book_id as string)) {
        context.state.showSpinner();
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

  React.useEffect(() => {
    fetchBookDetail();
  }, [router.asPath]);
  return (
    <Layout>
      <Grid templateColumns="repeat(5, 1fr)" column={2}>
        <GridItem colSpan={2}>
          <Box maxW="400" maxH="600">
            <Image
              src={GET_ISBN_COVER_S(router.query.book_id as string)}
              width="400"
              height="600"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <VStack alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="semibold">
              {!isEmpty(fetchResult.full_title as string)
                ? fetchResult.title
                : fetchResult.full_title}
            </Text>
            <Text>{worksResult.description}</Text>
          </VStack>
        </GridItem>
      </Grid>
      <Button>Add to Cart</Button>
    </Layout>
  );
}

export default BooksDetail;
