import { Box, Text, VStack, Image, Button } from "@chakra-ui/react";
import { IOpenLibraryDoc } from "@/modules";
import React from "react";
import { useRouter } from "next/router";

interface ITile {
  document: IOpenLibraryDoc;
}

export function Tile(props: ITile) {
  const { title, authors, isbn, first_sentence } = props.document;
  const router = useRouter();
  return (
    <>
      <VStack as="article" rounded="md" maxW="300" m="auto">
        <Box w="250" h="300">
          {isbn && isbn.length > 0 && (
            <Image
              borderRadius="md"
              src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
              fallbackSrc="https://via.placeholder.com/150"
              maxW="250"
              maxH="300"
              alt={`${isbn[0]}`}
            />
          )}
        </Box>

        <Box alignSelf="flex-start">
          <Text fontWeight="semibold" size="md" noOfLines={2}>
            {title}
          </Text>
          <Text fontSize="sm">By {authors}</Text>
          <Box>
            <Text noOfLines={3} fontSize="sm" pt={3}>
              {first_sentence}
            </Text>
          </Box>
          <Text>{isbn}</Text>
        </Box>
        <Box w="100%">
          <Button
            colorScheme="blue"
            isFullWidth
            onClick={() => {
              router.push(`/books/detail/${isbn[0]}`);
            }}
          >
            View Book
          </Button>
        </Box>
      </VStack>
    </>
  );
}
