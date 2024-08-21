import {
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
   
    FormErrorMessage,
  } from "@chakra-ui/react";
  import { CgProfile } from "react-icons/cg";
  import { CiSquarePlus } from "react-icons/ci";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { useForm, Controller } from "react-hook-form";
  import { getToken } from "../../pages/login/tokenManager";
  import axios from "axios";
  import { TaskProps } from "../../types/task";
  
  export default function Header() {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<TaskProps>();
  
    const onSubmit = (data: TaskProps) => {
      axios.post('http://localhost:3000/task', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
        if (response.status === 201) {
          alert('Tarefa criada com sucesso!');
          onClose();
        }
      })
      .catch(error => {
        console.error('Erro ao criar a tarefa:', error);
        alert('Ocorreu um erro ao criar a tarefa. Por favor, tente novamente.');
      });
    }
  
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Flex
        w="100%"
        p="1%"
        justifyContent="space-between"
        fontSize="3rem"
        h="5rem"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          gap=".5rem"
          fontSize={{ base: "1rem", md: "2rem", lg: "2rem" }}
        >
          <CgProfile />
          <Text>Hello, User</Text>
        </Flex>
  
        <Flex
          alignItems="center"
          fontSize={{ base: "1rem", md: "2rem", lg: "2rem" }}
        >
          <Text fontWeight="bold">Add a Task</Text>
          <Button onClick={onOpen} bg="none" p=".5rem" _hover={{}} _active={{}}>
            <CiSquarePlus fontSize="3rem" />
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must be at least 3 characters long" } })} />
                {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
              </FormControl>
  
              <FormControl mt={4} isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Input {...register("description", { minLength: { value: 3, message: "Description must be at least 3 characters long" } })} />
                {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
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
                {errors.expirationDate && <FormErrorMessage>{errors.expirationDate.message}</FormErrorMessage>}
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
  