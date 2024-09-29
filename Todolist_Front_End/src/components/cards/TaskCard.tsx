import {
  Flex,
  Button,
  Text,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { TaskProps } from "../../types/task";
import { format } from "date-fns";
import axios from "axios";
import { getToken } from "../../pages/login/tokenManager";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
export default function TaskCard({
  id,
  title,
  description,
  status,
  expirationDate,
}: TaskProps) {
  const [mark, setMark] = useState<boolean>(true);
  const [color, setColor] = useState<string>("#f6f6f6");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskProps>();

  const formattedDate = expirationDate
    ? format(new Date(expirationDate), "dd MMM yyyy")
    : "No Date";
  const markTask = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    location.reload();

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
    location.reload();
  };
  const delTask = async (id: string) => {
    await axios
      .delete(`http://localhost:3000/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then()
      .catch(() => {
        alert("Erro!");
      });
    location.reload();
  };
  useEffect(() => {
    verify();
    if (isOpen) {
      loadTask();
    }
  }, [isOpen]);
  const loadTask = async () => {
    const response = await axios.get(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    reset(response.data);
  };
  const verify = async () => {
    const response = await axios.get(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.data.status === "TO_DO") {
      response.data.status = `${"DONE"}`;
      setMark(true);
      setColor("#f6f6f6");
    } else {
      response.data.status = `${"TO_DO"}`;
      setMark(false);
      setColor("#a6eb9f");
    }
  };
  const onSubmit = (data: TaskProps) => {
    axios
      .put(`http://localhost:3000/task/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          onClose();
        }
      })
      .catch((error) => {
        console.error("Erro ao criar a tarefa:", error);
      
      });
    location.reload();
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
      transition=".5s"
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
            <MenuItem onClick={onOpen}>Edit</MenuItem>
            <MenuItem gap="1rem" onClick={() => delTask(id)}>
              Delete <FaTrash color="red" />
            </MenuItem>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                })}
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Input
                {...register("description", {
                  minLength: {
                    value: 3,
                    message: "Description must be at least 3 characters long",
                  },
                })}
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.expirationDate}>
              <FormLabel>Date</FormLabel>
              <Controller
                name="expirationDate"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                    customInput={<Input />}
                  />
                )}
              />
              {errors.expirationDate && (
                <FormErrorMessage>
                  {errors.expirationDate.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
