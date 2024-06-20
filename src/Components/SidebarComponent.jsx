import { Avatar, Box, Button, Flex, Link, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { InstagramLogo } from './AlliconsComponent'
import { FaInstagram, FaRegPlusSquare } from "react-icons/fa";
// import { HiMiniHome } from "react-icons/hi2";
// import { CiSearch } from "react-icons/ci";
// import { IoIosNotifications } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import useLogOut from '../hooks/useLogOut';
import SideBarItem from '../sidebarComponent/SideBarItem';

function SidebarComponent() {
  // sidebarItems
  // const sidebarItems = [
  //   {
  //     icon: <HiMiniHome size={25} />,
  //     text: "Home",
  //     link: "/"
  //   },
  //   {
  //     icon: <CiSearch size={25} />,
  //     text: "Search",
  //     link: "/search"
  //   },
  //   {
  //     icon: <IoIosNotifications size={25} />,
  //     text: "Notification",
  //     link: "/notifications"
  //   },
  //   {
  //     icon: <FaRegPlusSquare size={25} />,
  //     text: "Create",
  //     link: "/create"
  //   },
  //   {
  //     icon: <Avatar size={"sm"} name='Smruti Ranjan Sahoo' src='https://bit.ly/dan-abramov' />,
  //     text: "Profile",
  //     link: "/S_R_Programmer"
  //   }
  // ];
  const{handleLogOut,isLoginOut}= useLogOut();
  
  return (
    <Box height={"100vh"} borderRight={"1px solid"} borderColor={"white"} py={8} position={"sticky"} top={0} left={0} px={{ base: 2, md: 4 }}>
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor={"pointer"}>
          <InstagramLogo />
        </Link>
        <Link to={"/"} as={RouterLink} p={2} display={{ base: "block", md: "none" }} cursor={"pointer"} borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={10}>
          <FaInstagram fontSize={24} />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
         <SideBarItem/>
        </Flex>
        {/* logOut */}
        <Tooltip label={"logout"} hasArrow key={"logout"} placement={"right"} openDelay={500} >
          {/* useLogOut hook */}
                <Flex onClick={handleLogOut} alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.400" }} borderRadius={6} p={2} mt={"auto"}>
                <BiLogOut />
                  <Button variant={"ghost"} _hover={{bg:"transparent"}} isLoading={isLoginOut} display={{ base: "none", md: "block" }}>
                    logout
                  </Button>
                </Flex>
              </Tooltip>
      </Flex>
    </Box>
  );
}

export default SidebarComponent;
