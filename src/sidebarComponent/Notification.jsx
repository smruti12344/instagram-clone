import { Box, Flex, Tooltip } from "@chakra-ui/react"
import { IoIosNotifications } from "react-icons/io";
function Notification() {
  return (
    <Tooltip label={"Notification"} hasArrow ml={1}  placement={"right"} openDelay={500} display={{base:"block",md:"none"}}>
    <Flex alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10, md:"full"}} justifyContent={{base:"center",md:"flex-start"}}>

    <IoIosNotifications size={20}  />
    <Box display={{base:"none",md:"block"}}>Notifications</Box>
    </Flex>
  </Tooltip>
  )
}

export default Notification
