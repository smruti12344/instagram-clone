import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import useSearchUser from "../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUserComponent from "../Components/SuggestedUserComponent";

function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { isLoading, SearchUserProfile, user, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    SearchUserProfile(searchRef.current.value);
  }

  return (
    <>
      <Tooltip label={"Search"} hasArrow ml={1} placement={"right"} openDelay={500}>
        <Flex 
          alignItems={"center"} 
          gap={4} 
          _hover={{ bg: "whiteAlpha.400" }} 
          borderRadius={6} 
          p={2} 
          w={{ base: 10, md: "full" }} 
          justifyContent={{ base: "center", md: "flex-start" }} 
          onClick={onOpen}
        >
          <CiSearch size={20} />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInLeft"
      >
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Search" ref={searchRef} />
              </FormControl>
              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button 
                  type="submit" 
                  ml={"auto"} 
                  size={"sm"} 
                  my={4} 
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUserComponent user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
