import { LinkBox, Box, Heading, LinkOverlay, Text, HStack } from "@chakra-ui/react";
import { IOpenLibraryDoc } from "@/modules";
import React from "react";
import Image from "next/image";

interface ITile {
  document: IOpenLibraryDoc;
}
//title
// authorname, img,
function Tile(props: ITile) {
  const { title, author_name, isbn } = props.document;
  return (
    <>
      <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
        <HStack>
          {isbn && isbn.length > 0 && (
            <Image
              src={`https://covers.openlibrary.org/b/isbn/${isbn[0]}-.jpg`}
              width="500"
              height="500"
            />
          )}
          <Box>
            <Heading size="md" my="2">
              <LinkOverlay href="#">{title}</LinkOverlay>
            </Heading>
            <Text>By {author_name}</Text>
            <Text>
              Catch up on what's been cookin at Smashing and explore some of the
              most popular community resources.
            </Text>
          </Box>
        </HStack>
      </LinkBox>
    </>
  );
}

export default Tile;
