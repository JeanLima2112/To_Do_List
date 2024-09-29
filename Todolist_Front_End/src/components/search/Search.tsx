import { Input,Button,InputGroup,InputRightAddon, Flex } from "@chakra-ui/react"
import {CiSearch} from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


export default function Search(){
    return(
        <Flex maxW='20rem' w='100%'>
            <InputGroup borderRadius='10rem' bg='#ffff' alignItems='center' border='1px solid #7b61f7'  width='100%' height='3.3rem'>
                <Input type='text' placeholder='Pesquisar...' opacity='.5' border='none' _focus={{boxShadow : 'none'}}  />
                <Button bg='none' _hover={{scale:'1.05'}} _active={{}}><InputRightAddon transition='.2s' opacity='.3' _hover={{opacity:'1'}} bg='none' border='none'><MdOutlineKeyboardArrowDown color="#7b61f7" size='30px' /></InputRightAddon></Button>
                <Button bg='none' _hover={{scale:'1.05'}} _active={{}} ><InputRightAddon transition='.2s' opacity='.3' _hover={{opacity:'1'}} bg='none' border='none'><CiSearch color="#7b61f7" size='30px' /></InputRightAddon></Button>
            </InputGroup>
        </Flex>
    )
}