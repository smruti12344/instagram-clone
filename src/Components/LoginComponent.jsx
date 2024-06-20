import React, { useState, } from 'react'
import { Input, Button, Alert, AlertIcon } from '@chakra-ui/react';

import useLogin from '../hooks/useLogin';


function LoginComponent() {
    const [inputs,setInputs] = useState({
        email:"",
        password:"",
        confirmPassword:""
      });

      //access useLogin hooks for login-user
      const{login,loading,error} = useLogin();
      const handleAuth= ()=>{
      // console.log("inputs",inputs);
      if(!inputs.email || !inputs.password){
        alert("Please fill all the files");
        return;
      }
      
  }
     //handle-Email
  const handleEmail=(e)=>{
    setInputs({
      email:e.target.value,
      password:inputs.password,
      confirmPassword:inputs.confirmPassword
    })
  }
  //handle-Password
  const handlePassword=(e)=>{
    setInputs({
      email:inputs.email,
      password:e.target.value,
      confirmPassword:inputs.confirmPassword
    })
  }
  return (
    <>
    <Input type='email' placeholder='Email' size={"sm"} onChange={handleEmail} value={inputs.email} fontSize={14}/>
    <Input type="password" placeholder='Password' size={"sm"} onChange={handlePassword} fontSize={14}/>
    {
                error && (
                    <Alert status='error' fontSize={13} p={2} borderRadius={4} >
                    <AlertIcon fontSize={15} />
                      {error.message}
                    </Alert>
                )
            }
    <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} isLoading={loading} onClick={()=>login(inputs)}>login</Button>
    </>
  )
}


export default LoginComponent
