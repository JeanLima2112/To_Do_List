import {
  Text,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";

export default function SingUp() {
  return (
    <Flex
      alignItems="center"
      minH="100dvh"
      direction="column"
      gap='1rem'
      bg='#f6f6f6'
    >
      <Flex alignItems="center">
        <Flex maxW="10rem">
          <Image w="100%" src="public/android-chrome-512x512.png" />
        </Flex>
        <Text fontSize="3rem">To DO</Text>
      </Flex>
      <Flex direction='column' gap='1rem' bg="#ffff" p='2%' borderRadius='1rem'>
        <Flex>
            <Text color="#319795" fontSize="1.5rem">Sing Up</Text>
        </Flex>
        <Flex>
            <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="your first name" type="email" />
            </FormControl>
        </Flex>
        <Flex>
            <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="create a username" type="email" />
            </FormControl>
        </Flex>
        <Flex>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="create a Password" type="email" />
            </FormControl>
        </Flex>
        <Flex justifyContent='space-between'> 
            <Button colorScheme='teal' variant='link'>
                Sing In 
            </Button>
            <Button colorScheme='teal' variant='solid'>
                Save
            </Button>
        </Flex>
    </Flex>
    </Flex>
  );
}
