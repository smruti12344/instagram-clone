import { Button, Container, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBarComponent() {
  return (
  <Container display={"flex"} maxW={"container.lg"} justifyContent={{base:"center",sm:"space-between"}} alignItems={"center"}>
    <Image src='https://gamingstreet.com/wp-content/uploads/2019/10/Instagram_logo_wordmark_logotype-1536x864.png' h={20} display={{base:"none", sm:"block"}} cursor={"pointer"}/>
    <Flex gap={4}>
        <Link to={'/auth'}>
            <Button colorScheme='blue' size={'sm'}>
                Login
            </Button>
        </Link>
        <Link to={"/auth"}>
            <Button variant={'outline'} size={'sm'}>
                Signup
            </Button>
        </Link>
    </Flex>
  </Container>
  )
}

export default NavBarComponent
