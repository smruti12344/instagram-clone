import { Box, Center, Container, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import AuthFormComponent from './AuthFormComponent';

function AuthPageComponent() {
  return (
    <Flex minH="100vh" justifyContent="center" alignItems={"center"}  sx={{ userSelect: "none" }}>
        <Container maxW="container.md" padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} >
                {/* Left-handside component */}
                <Box display={{base:"none", md:"block"}}m={0}>
                    <Image src='https://freepngimg.com/thumb/marketing/70806-development-instagram-mobile-marketing-app-iphone-user.png' borderRadius={20} h={600} alt='mobile image' />
                </Box>
                
                {/* right-side component */}
                <VStack >
                    <AuthFormComponent/>
                    <Box textAlign={"center"} >Get the App..  </Box>
                    <Flex gap={5} justifyContent={"center"}>
                        <Image src='https://www.pngmart.com/files/10/Google-Play-App-Store-PNG-Photos.png'  h={20} alt='playstore logo'/>
                        <Image src='https://attackofthefanboy.com/wp-content/uploads/2014/07/Microsoft-Logo.jpg' h={20}/>
                    </Flex>
                </VStack>
            </Flex>
        </Container>
    </Flex>
  )
}

export default AuthPageComponent
