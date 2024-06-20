import { Box, Flex, Grid, Skeleton, VStack } from '@chakra-ui/react';
import ProfilePostComponent from './ProfilePostComponent';
import useGetUserPost from '../hooks/useGetUserPost';

function ProfilePostsComponent() {
    const { isLoading, posts } = useGetUserPost();
    const noPostFound = !isLoading && posts.length === 0;

    if (noPostFound) {
        return <NoPostFound />;
    }

    return (
        <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1} mt={4}>
            {isLoading && [0, 1, 2, 3].map((_, idx) => (
                <VStack key={idx} alignItems={"flex-start"} gap={4}>
                    <Skeleton w={"full"}>
                        <Box h={"300px"}>Content wrapped</Box>
                    </Skeleton>
                </VStack>
            ))}
            {!isLoading && (
                <>
                    {posts.map((post) => (
                        <ProfilePostComponent post={post} key={post.id} />
                    ))}
                </>
            )}
        </Grid>
    );
}

export default ProfilePostsComponent;




const NoPostFound = ()=>{
  return(
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Flex fontSize={"2xl"}>No Post Found !</Flex>
    </Flex>
  )
}