import {
  Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Avatar,
} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import usePreviewImg from '../hooks/usePreviewImg';
import useEditProfile from '../hooks/useEditProfile';
import useShowToasta from '../hooks/useShowToasta';

function EditProfileComponent({ isOpen, onClose }) {
  // Get state to configure all field data
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: ""
  });
  // Configure user data to set in edit profile field
  const authUser = useAuthStore(state => state.user);

  // Setting file for choose image
  const fileRef = useRef(null);
  const { handleImgChange, selectImg, setSelectImg, isLoading } = usePreviewImg();
  const { editProfile, isUpdating } = useEditProfile();
  const showToast = useShowToasta();

  // Handle Edit Profile
  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectImg);
      setSelectImg(null);
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  // Initialize form inputs with authUser data
  useEffect(() => {
    if (authUser) {
      setInputs({
        fullName: authUser.fullName,
        username: authUser.username,
        bio: authUser.bio
      });
    }
  }, [authUser]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black" boxShadow="xl" border="1px solid gray" mx={3}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex bg="black">
              <Stack spacing={4} w="full" maxW="md" bg="black" p={6}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  User Profile Edit
                </Heading>
                <FormControl id="userName">
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectImg || authUser.profilePicUrl}
                        border="1px solid white"
                      />
                      {isLoading && <Spinner />}
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>Change profile pic</Button>
                    </Center>
                    <Input type="file" multiple accept="image/*" hidden ref={fileRef} onChange={handleImgChange} />
                  </Stack>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Full Name"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                  />
                </FormControl>
                <FormControl id="bio" isRequired>
                  <FormLabel>Bio</FormLabel>
                  <Input
                    placeholder="Bio"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.bio}
                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                  />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    onClick={onClose}
                    bg="red.400"
                    color="white"
                    w="full"
                    _hover={{ bg: 'red.500' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg="blue.400"
                    color="white"
                    w="full"
                    _hover={{ bg: 'blue.500' }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfileComponent;
