import { Flex, Button, Text} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { Checkbox} from '@chakra-ui/react'


export default function TaskCard(){
    return(
        <Flex direction='column' bg='#f6f6f6' gap='.5rem' maxW='20rem' p='1.5%' borderRadius='2rem'>
            <Flex justifyContent='right' >
                <Button bg='none' _hover={{}} _active={{}} >
                    <IoIosMore fontSize='2rem' />
                </Button>
            </Flex>
            <Flex >
                <Text fontWeight='bold'>Lorem Ipsum</Text>
            </Flex>
            <Flex>
                <Text>Duis eiusmod fugiat exercitation exercitation voluptate non occaecat officia anim do.</Text>
            </Flex>
            <Flex justifyContent='space-between'>
                <Flex><Text fontWeight='bold'>TO_DO</Text></Flex>
                <Flex gap='1rem' >
                    <Text>02-21-2024</Text>
                    <Checkbox defaultChecked></Checkbox>
                </Flex>
            </Flex>
        </Flex>

    )
}