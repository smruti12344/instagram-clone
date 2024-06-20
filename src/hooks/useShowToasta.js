import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

function useShowToasta() {
    // intialize useToast() hooks form chakra-ui
    const toast = useToast();
    //useCallback hook is used to prevent infinite loop, by caching the function
  const showToasta = useCallback((title,description,status)=>{
   toast({
      title:title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
   });
},[toast])
    return showToasta;
}

export default useShowToasta
