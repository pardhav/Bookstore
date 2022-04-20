import { Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { Layout, Tile } from "@/components";
import {
  IOpenLibraryDoc,
  IOpenLibrarySearchRes,
  useGlobalContext,
  isEmpty,
} from "@/modules";
import { useRouter } from "next/router";
import React from "react";

function Search() {
  const router = useRouter();
  const context = useGlobalContext();

  const [fetchResult, setFetchResult] = React.useState(
    {} as IOpenLibrarySearchRes
  );

  const fetchResults = async () => {
    console.log(router.query);
    if (isEmpty(router.query.query_param as string)) {
      context.state.showSpinner();
      const res = await axios({
        method: "GET",
        url: `https://openlibrary.org/search.json`,
        params: {
          language: "eng",
          title: router.query.query_param as string,
          limit: 25,
          page: 1,
          mode: "everything",
        },
      });
      console.log(res.data);
      setFetchResult(res.data);
      context.state.hideSpinner();
    }
  };
  React.useEffect(() => {
    console.log("--- USE EFFECT OF SEARCH---");
    if (router.isReady) {
      fetchResults();
    }
  }, []);
  return (
    <>
      <Layout>
        <Text>
          Showing {fetchResult.numFound} Results for 
          {<span>{router.query.query_param}</span>}
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={10} mt="10">
          {fetchResult?.docs &&
            fetchResult?.docs.map((doc, index) => (
              <GridItem key={index}>
                <Tile document={doc as IOpenLibraryDoc} />
              </GridItem>
            ))}
        </Grid>
      </Layout>
    </>
  );
}

export default Search;
