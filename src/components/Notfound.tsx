import { Center, Stack, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Layout } from "./Layout";

interface INotFound {
  image: StaticImageData;
  tagline: string;
}

export function Notfound(props: INotFound) {
  const { image, tagline } = props;
  return (
    <Layout>
      <Center>
        <Stack>
          <Image src={image} width="500px" height={"400px"} />
          <Text textAlign={"center"} color={"gray.700"} fontWeight={"semibold"}>
            {tagline}
          </Text>
        </Stack>
      </Center>
    </Layout>
  );
}
