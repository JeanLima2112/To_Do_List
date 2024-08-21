import { Flex, Button, Text, Checkbox, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { TaskProps } from "../../types/task";
import { format } from "date-fns";
import axios from "axios";
import { getToken } from "../../pages/login/tokenManager";

export default function TaskCard({
  id,
  title,
  description,
  status,
  expirationDate,
}: TaskProps) {
  const formattedDate = expirationDate ? format(new Date(expirationDate), "dd MMM yyyy") : "No Date";
  const delTask = async (id: string) => {
    await axios.delete(`http://localhost:3000/task/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(response => {

        if (response.status == 200){
          alert('Apagado')          
        }
      })
      .catch( () =>{
        alert("Erro!")
      })
        

  }

  return (
    <Flex
      direction="column"
      bg="#f6f6f6"
      gap="1rem"
      maxW="20rem"
      p="1.5rem"
      borderRadius="1rem"
      boxShadow="md"
    >
      <Flex justifyContent="flex-end">
      <Menu>
          <MenuButton
            as={Button}
            bg="none"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          >
            <IoIosMore fontSize="1.5rem" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => console.log(`Delete task ${id}`)}>Edit</MenuItem>
            <MenuItem onClick={() => delTask(id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column" gap="0.5rem">
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text>{description}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" gap='1rem'>
        <Text fontWeight="bold" color="gray.600">
          {status}
        </Text>
        <Flex alignItems="center" gap="1rem">
          <Text color="gray.500">{formattedDate}</Text>
          <Checkbox />
        </Flex>
      </Flex>
    </Flex>
  );
}
