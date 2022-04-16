import { Wrap, WrapItem, Center, VStack } from "@chakra-ui/react";
import axios from "axios";
import Tile from "components/Books/tile";
import Layout from "components/Layout";
import { IOpenLibraryDoc, IOpenLibrarySearchRes } from "@/modules";
import { useRouter } from "next/router";
import React from "react";
import { searchRes } from "./testResponse";

function Search() {
  const router = useRouter();
  console.log(router.query);
  const searchKey: string = router.query.q as string;
  const [fetchResult, setFetchResult] = React.useState(
    {} as IOpenLibrarySearchRes
  );
  const fetchResults = async () => {
    // const res = await axios({
    //   method: "GET",
    //   url: `http://openlibrary.org/search.json?q=${encodeURIComponent(
    //     searchKey
    //   )}`,
    // });
    setFetchResult(searchRes);
  };
  React.useEffect(() => {
    console.log("--- USE EFFECT OF SEARCH---");
    fetchResults();
  }, []);
  return (
    <>
      <Layout>
        <div>Search {router.query.q}</div>
        <VStack>
          {fetchResult?.docs &&
            fetchResult?.docs.map((doc) => (
              <Tile key={doc.title} document={doc as IOpenLibraryDoc} />
            ))}
        </VStack>
        {/* <Wrap>
          {fetchResult?.docs &&
            fetchResult?.docs.map((doc) => (
              <WrapItem key={doc.title}>
                <Tile document={doc as IOpenLibraryDoc} />
              </WrapItem>
            ))}
        </Wrap> */}
      </Layout>
    </>
  );
}

export default Search;
