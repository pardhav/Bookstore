import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { PriceTag } from "./CartPriceTag";
import { CartProductMeta } from "./CartProductMeta";

type CartItemProps = {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  imageUrl: string;
  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = (props: CartItemProps) => {
  const {
    name,
    description,
    quantity,
    imageUrl,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} image={imageUrl} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <PriceTag price={price} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex> */}
    </Flex>
  );
};
