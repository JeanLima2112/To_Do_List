import {
  Text,
  Flex,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setPhrase, setToken, setUserId, setUserName } from "../login/tokenManager";

export default function SingUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const control = Object.keys(errors).length > 0;
  const navigate = useNavigate();
  const watchPassword = watch("password");
  const onSubmit = (data: object) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/users`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const user_id = response.data.id
        setUserId(user_id)
        const username = response.data.name
        setPhrase()
        setUserName(username)
        if (response.status == 201) {
          axios
            .post(`${import.meta.env.VITE_API_URL}/auth/login`, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              const token = response.data.token;
              setToken(token);
              navigate("/home");
            });
        }
      })
      .catch(() => {
        alert("Erro Na Criação do Usuario!");
      });
  };

  return (
    <Flex
      alignItems="center"
      minH="100dvh"
      direction="column"
      gap="1rem"
      bg="#f6f6f6"
    >
      <Flex alignItems="center">
        <Flex maxW="10rem">
          <Image w="100%" src="public/android-chrome-512x512.png" />
        </Flex>
        <Text fontSize="3rem">To DO</Text>
      </Flex>
      <Flex direction="column" gap="1rem" bg="#ffff" p="2%" borderRadius="1rem">
        <Flex>
          <Text color="#319795" fontSize="1.5rem">
            Sing Up
          </Text>
        </Flex>
        <Flex>
          <FormControl isInvalid={control}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="your first name"
              type="name"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors?.name?.type === "minLength" && (
              <FormErrorMessage>
                Name must have at least 3 characters.
              </FormErrorMessage>
            )}
            {errors?.name?.type === "required" && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isInvalid={control}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="create a username"
              type="username"
              {...register("username", { required: true, minLength: 3 })}
            />
            {errors?.username?.type === "minLength" && (
              <FormErrorMessage>
                Username must have at least 3 characters.
              </FormErrorMessage>
            )}
            {errors?.username?.type === "required" && (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isInvalid={control}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="create a Password"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors?.password?.type === "required" && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
            {errors?.password?.type === "minLength" && (
              <FormErrorMessage>
                Password must have at least 8 characters.
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isInvalid={control}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="enter password again"
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) => value === watchPassword,
              })}
            />
            {errors?.passwordConfirmation?.type === "required" && (
              <FormErrorMessage>
                Password confirmation is required.
              </FormErrorMessage>
            )}
            {errors?.passwordConfirmation?.type === "validate" && (
              <FormErrorMessage>Passwords does not match.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex justifyContent="space-between">
          <Button colorScheme="teal" variant="link">
            <Link to="singin">Sing In</Link>
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
