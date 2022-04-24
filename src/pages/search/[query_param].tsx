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
import { searchUsingTitle } from "modules/firebase/searchServices";

function Search() {
  const router = useRouter();
  const context = useGlobalContext();

  const [fetchResult, setFetchResult] = React.useState({} as any);

  const fetchResults = async () => {
    console.log(router.query);
    if (isEmpty(router.query.query_param as string)) {
      context.state.showSpinner();
      // const res = await axios({
      //   method: "GET",
      //   url: `https://openlibrary.org/search.json`,
      //   params: {
      //     language: "eng",
      //     title: router.query.query_param as string,
      //     limit: 25,
      //     page: 1,
      //     mode: "everything",
      //   },
      // });
      const res = await searchUsingTitle(router.query.query_param as string);
      console.log(res);
      setFetchResult(res as any);
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
        <Grid templateColumns="repeat(5, 1fr)" mt="10">
          {fetchResult?.hits &&
            fetchResult?.hits.map((doc: any, index: number) => (
              <GridItem key={index}>
                <Tile
                  title={doc.title}
                  imageUrl={`https://covers.openlibrary.org/b/isbn/${doc.isbn}-M.jpg`}
                  isbn={doc.isbn as string}
                />
              </GridItem>
            ))}
        </Grid>
      </Layout>
    </>
  );
}

export default Search;
