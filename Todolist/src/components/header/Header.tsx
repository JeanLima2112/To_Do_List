import { Button, Flex, Text } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";



export default function Header(){
    return(
        <Flex w='100%' p='1%' justifyContent='space-between' fontSize='3rem' h='5rem' alignItems='center'>
            <Flex alignItems='center' gap='.5rem' fontSize={{base:'1rem',md:'2rem',lg:'2rem'}}>
                <CgProfile  />
                <Text>Hello, User</Text>
            </Flex>
            
            <Flex alignItems='center' fontSize={{base:'1rem',md:'2rem',lg:'2rem'}}>
                <Text fontWeight='bold'>Add a Task</Text>
                <Button bg='none' p=".5rem" _hover={{}} _active={{}} >
                    <CiSquarePlus fontSize='3rem' />
                </Button>
            </Flex>
            
        </Flex>
    )
}