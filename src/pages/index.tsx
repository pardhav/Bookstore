import { Box, Heading } from "@chakra-ui/react";
import { Layout, Tile } from "@/components";
import type { NextPage } from "next";
import React from "react";
import { getHomeLists, IOpenLibraryDoc } from "@/modules";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Home: NextPage = () => {
  const listKeys = [
    {
      heading: "DC Comics",
      key: "dc_comics",
    },
    {
      heading: "Marvel Comics",
      key: "marvel",
    },
    {
      heading: "Web Development",
      key: "webDev",
    },
    {
      heading: "Cambridge Press",
      key: "cambridgePress",
    },
    {
      heading: "Harry Potter Series",
      key: "harryPotter",
    },
  ];
  const [lists, setLists] = React.useState({} as any);
  const fetchHomeLists = async () => {
    const res = await getHomeLists();
    setLists(res as any);
    console.log(res);
  };
  React.useEffect(() => {
    fetchHomeLists();
  }, []);
  return (
    <Layout>
      <>
        <Heading
          color={"gray.500"}
          fontSize={"sm"}
          textTransform={"uppercase"}
          mb={4}
        >
          Curated Lists made for You
        </Heading>
        {lists &&
          Object.keys(lists).length > 0 &&
          listKeys.map((listKey, index) => {
            return (
              <Box key={index}>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {listKey.heading}
                </Heading>
                <Carousel responsive={responsive}>
                  {lists[listKey.key].map(
                    (doc: IOpenLibraryDoc, index: number) => {
                      return (
                        <Tile
                          key={index}
                          title={doc.title}
                          imageUrl={`https://covers.openlibrary.org/b/isbn/${doc.isbn}-M.jpg`}
                          isbn={doc.isbn as string}
                        />
                      );
                    }
                  )}
                </Carousel>
              </Box>
            );
          })}
      </>
    </Layout>
  );
};

export default Home;
