import {Flex,Text, Modal ,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from "react";
import { newDate } from "react-datepicker/dist/date_utils";



export default function Header(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ selectionDate, setSelectionDate] = useState(new Date)
    return(
        <Flex w='100%' p='1%' justifyContent='space-between' fontSize='3rem' h='5rem' alignItems='center'>
            <Flex alignItems='center' gap='.5rem' fontSize={{base:'1rem',md:'2rem',lg:'2rem'}}>
                <CgProfile  />
                <Text>Hello, User</Text>
            </Flex>
            
            <Flex alignItems='center' fontSize={{base:'1rem',md:'2rem',lg:'2rem'}}>
                <Text fontWeight='bold'>Add a Task</Text>
                <Button onClick={onOpen} bg='none' p=".5rem" _hover={{}} _active={{}} >
                    <CiSquarePlus fontSize='3rem' />
                </Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a New Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input />
                        </FormControl>

                        <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input  />
                        </FormControl>

                        <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <CalendarContainer>
                            <DatePicker
                                showIcon
                                selected={selectionDate}
                                onChange={date => setSelectionDate(date)}
                                dateFormat = "yyyy/MM/dd"
                                minDate={new Date()}
                                />
                        </CalendarContainer>
                        
                      
                       
                        
                        
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                        Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
             </Modal>
        </Flex>
        
    )
}