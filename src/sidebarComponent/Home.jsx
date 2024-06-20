import { Tooltip,Link, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { HiMiniHome } from "react-icons/hi2";

function Home() {
  return (
    <Tooltip label={"Home"} hasArrow ml={1}  placement={"right"} openDelay={500} display={{base:"block",md:"none"}}>
                <Link to="/" as={RouterLink} display={"flex"} alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.400" }} borderRadius={6} >
                 
                  <Flex alignItems={"center"} gap={4}  w={{base:10, md:"full"}} justifyContent={{base:"center",md:"flex-start"}} p={2}>

                  <HiMiniHome size={20} /> 
                  <Box display={{base:"none",md:"block"}}>Home</Box>
                 </Flex>
                </Link>
              </Tooltip>
  )
}

export default Home
