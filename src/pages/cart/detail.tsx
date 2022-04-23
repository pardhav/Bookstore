import { Box } from "@chakra-ui/react";
import { Layout } from "@/components";
import React from "react";
import { fetchCartDetails, useGlobalContext } from "@/modules";

function Detail() {
  const context = useGlobalContext();
  const [cartData, setCartData] = React.useState();
  const fetchCartData = async () => {
    if (context?.state?.user) {
      const data = await fetchCartDetails(context?.state?.user.uid);
      setCartData(data);
      console.log({ data });
    }
  };
  React.useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <>
      <Layout>
        <Box>This is Cart page</Box>
      </Layout>
    </>
  );
}

export default Detail;
