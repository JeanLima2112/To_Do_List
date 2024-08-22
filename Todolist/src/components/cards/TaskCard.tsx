import {
  Flex,
  Button,
  Text,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { TaskProps } from "../../types/task";
import { format } from "date-fns";
import axios from "axios";
import { getToken } from "../../pages/login/tokenManager";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
export default function TaskCard({
  id,
  title,
  description,
  status,
  expirationDate,
}: TaskProps) {
  const [mark, setMark] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#f6f6f6');


  const formattedDate = expirationDate
    ? format(new Date(expirationDate), "dd MMM yyyy")
    : "No Date";
  const markTask = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    location.reload()

    if (response.data.status === "TO_DO") {
      response.data.status = `${"DONE"}`;
    } else {
      response.data.status = `${"TO_DO"}`;
    }

    await axios.put(`http://localhost:3000/task/${id}`, response.data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    location.reload()
  };
  const delTask = async (id: string) => {
    await axios
      .delete(`http://localhost:3000/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          alert("Apagado");
        }
      })
      .catch(() => {
        alert("Erro!");
      });
      location.reload()
      
  };
  useEffect(() => {
    verify();
  }, []);
  const verify = async () => {
    const response = await axios.get(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.data.status === "TO_DO") {
      response.data.status = `${"DONE"}`;
      setMark(true);
      setColor('#f6f6f6')
    } else {
      response.data.status = `${"TO_DO"}`;
      setMark(false);
      setColor('#a6eb9f')
    }
  };

  return (
    <Flex
      direction="column"
      bg={color}
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
            <MenuItem onClick={() => console.log(`Delete task ${id}`)}>
              Edit
            </MenuItem>
            <MenuItem  gap='1rem' onClick={() => delTask(id)}>Delete <FaTrash color="red" /></MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column" gap="0.5rem">
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text>{description}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" gap="1rem">
        <Text fontWeight="bold" color="gray.600">
          {status}
        </Text>
        <Flex alignItems="center" gap="1rem">
          <Text color="gray.500">{formattedDate}</Text>
          <Checkbox
            colorScheme="green"
            isChecked={!mark}
            onChange={() => markTask(id)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
