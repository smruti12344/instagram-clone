import { Box, Flex, Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

function ProfileTabComponent() {
  return (
  <Flex w={"full"} justifyContent={"center"} gap={{base:4,sm:10}} textTransform={"uppercase"} fontWeight={"bold"} >
    <Flex borderTop={"1px solid white"} alignItems={"center"} gap={2} cursor={"pointer"} >

    <Box display={"flex"} gap={2} mt={2}>
      <Box fontSize={20} >
        <BsGrid3X3 />
      </Box>
      <Text fontSize={12} display={{base:"none",sm:"block"}}>Posts</Text>
      </Box>
    </Flex>
    
    <Flex   alignItems={"center"} gap={2} cursor={"pointer"}>

<Box display={"flex"} gap={2} mt={2}>
<Box fontSize={20}>
  <BsBookmark />
</Box>
<Text fontSize={12} display={{base:"none",sm:"block"}}>Saved</Text>
</Box>
</Flex>

<Flex   alignItems={"center"} gap={2} cursor={"pointer"}>
<Box display={"flex"} gap={2} mt={2}>
  
<Box fontSize={20}>
  <BsSuitHeart />
</Box>
<Text fontSize={12} display={{base:"none",sm:"block"}}>Likes</Text>
</Box>
</Flex>
  </Flex>
  )
}

export default ProfileTabComponent
