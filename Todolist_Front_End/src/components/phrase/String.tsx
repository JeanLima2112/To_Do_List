import { Flex, Text } from "@chakra-ui/react";
import { getPhrase } from "../../pages/login/tokenManager";



export default function String() {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <Text fontWeight="bold" fontSize={{ base: "1.2rem", md: "2rem" }}>
        {getPhrase()}
      </Text>
    </Flex>
  );
}
