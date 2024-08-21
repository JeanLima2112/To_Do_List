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
import {useForm} from 'react-hook-form'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "./tokenManager";


export default function SingIN() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const control = Object.keys(errors).length > 0;
  const navigate = useNavigate();
  const onSubmit = (data: object) => {
    axios.post('http://localhost:3000/auth/login',data,{headers:{'Content-Type':'application/json'}})
      .then(response => {

        if (response.status == 200){
          alert('Log in Realizado!')
          const token = response.data.token;
          setToken(token);  
          console.log(token);
          navigate('/home');

          
        }
      })
      .catch( () =>{
        alert("Erro!")
      })
    
  }
  
 
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
            <FormControl isInvalid = {control}>
            <FormLabel>Username</FormLabel>
            <Input  placeholder="your username" type="username" {...register('username',{required:true,minLength:3})}/>
            {errors?.username?.type === 'minLength' && (<FormErrorMessage>Username must have at least 3 characters.</FormErrorMessage>)}
            {errors?.username?.type === 'required' && (<FormErrorMessage>Username is required.</FormErrorMessage>)} 
            
            </FormControl>
        </Flex>
        <Flex>
            <FormControl isInvalid = {control}>
            <FormLabel>Password</FormLabel>
            <Input  placeholder="your Password" type="password" {...register('password',{required:true,minLength:8})} />
            {errors?.password?.type === 'required' && (<FormErrorMessage>Password is required.</FormErrorMessage>)}
            {errors?.password?.type === 'minLength' && (<FormErrorMessage>Password must have at least 8 characters.</FormErrorMessage>)}
            </FormControl>
        </Flex>
        
        <Flex justifyContent='space-between'> 
            <Button colorScheme='teal' variant='link'  >
                <Link to='/'>
                  Sing Up
                </Link>
            </Button>
            <Button colorScheme='teal' variant='solid' onClick={()=> handleSubmit(onSubmit)()}>
                Save
            </Button>
        </Flex>
      </Flex>
    </Flex>
  );
  
}
