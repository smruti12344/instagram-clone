// ResetPassword.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
  useToast,
  Container,
} from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const query = useQuery();
  const history = useHistory();
  const toast = useToast();
  const oobCode = query.get('oobCode');

  useEffect(() => {
    const verifyCode = async () => {
      try {
        if (!oobCode) {
          setError('Invalid or missing code');
        }
        await verifyPasswordResetCode(auth, oobCode);
      } catch (error) {
        setError('Invalid or expired password reset code.');
      }
    };

    verifyCode();
  }, [oobCode]);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast({
        title: 'Password has been reset successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        history.push('/login'); // Redirect to login page
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container centerContent>
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        mt={10}
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Reset Password
          </Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl id="new-password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handlePasswordReset}>
            Reset Password
          </Button>
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPassword;
