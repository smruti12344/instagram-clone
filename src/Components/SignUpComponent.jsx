
import React, { useState } from 'react';
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useSignUpWithEmailPassword from '../hooks/useSignUpWithEmailPassword';
import { Alert,AlertIcon } from '@chakra-ui/react'
function SignUpComponent() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const{loading,error,signUp}=useSignUpWithEmailPassword();

    return (
        <>
            <Input
                type='email'
                size={"sm"}
                placeholder='Email'
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                value={inputs.email}
                fontSize={14}
            />
            <Input
                type='text'
                size={"sm"}
                placeholder='Username'
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                value={inputs.username}
                fontSize={14}
            />
            <Input
                type='text'
                size={"sm"}
                placeholder='Full Name'
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                value={inputs.fullName}
                fontSize={14}
            />
            <InputGroup>
                <Input
                    type={showPassword ? "text" : "password"}
                    size={"sm"}
                    placeholder='Enter Password'
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    value={inputs.password}
                    fontSize={14}
                />
                <InputRightElement h={"full"}>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {
                error && (
                    <Alert status='error' fontSize={13} p={2} borderRadius={4} >
                    <AlertIcon fontSize={15} />
                      {error.message}
                    </Alert>
                )
            }
            {/* here we send user signUp data one component to another component */}
            <Button isLoading={loading}  w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={()=>{signUp(inputs)}}>
                Sign Up
            </Button>
        </>
    );
}

export default SignUpComponent;
