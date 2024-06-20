import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from './FeedPost'
import SuggestedUsersComponent from './SuggestedUsersComponent'

function HomePageComponent() {
  return (
    <Container maxW={"container.lg"}>
    <Flex gap={20}>
       <Box flex={2} py={30} >
        <FeedPosts/>
       </Box>
       <Box flex={3} mr={20} display={{base:"none",lg:"block"}} maxW={"300px"} >
        <SuggestedUsersComponent/>
       </Box>
    </Flex>

    </Container>
  )
}

export default HomePageComponent
