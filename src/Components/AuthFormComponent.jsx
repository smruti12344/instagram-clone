import { Box, Flex, Image, VStack,Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import GoogleAuthComponent from './GoogleAuthComponent';
import { Link } from 'react-router-dom';

function AuthFormComponent() {
  const[islogin , setIsLogin] = useState(true);
  

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={4} >
        <VStack spacing={3} >
          <Image src='https://gamingstreet.com/wp-content/uploads/2019/10/Instagram_logo_wordmark_logotype-1536x864.png'w={60} h={35} cursor={"pointer"} alt='instagram'/>
           

           {islogin ? <LoginComponent/> : <SignUpComponent/>}
           {/* ------ OR ---------- */}
           <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={3} w={"full"}>
            <Box flex={2} h={"1px"} bg={"white"}/>
            <Text>OR</Text>
            <Box flex={2} h={"1px"} bg={"white"}/>
           </Flex>
           <GoogleAuthComponent prefix={islogin ? "log in" : "sign up"}/>
          
        </VStack>
         
      </Box>
      {/* Switch between sign in and sign up */}
      <Box border={"1px solid gray"} borderRadius={4} padding={4} w={"full"} cursor={"pointer"} > 
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Box mx={2} fontSize={14}>
          {islogin?"Don't have account?":"Already have an account"}
        </Box>
        <Box onClick={()=>setIsLogin(!islogin)} color={"blue.400"}>
          {islogin?"Sign up":"Log in"}
        </Box>
      </Flex>
       
      </Box>
     
    </>
      
    
  )
}

export default AuthFormComponent;
