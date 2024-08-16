import { Flex, Text } from "@chakra-ui/react";
import { PhraseProps } from "../../types/Phrase";

export default function String({ advice }: PhraseProps) {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <Text fontWeight="bold" fontSize={{ base: "1.2rem", md: "2rem" }}>
        {advice}
      </Text>
    </Flex>
  );
}
