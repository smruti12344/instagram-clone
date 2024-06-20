import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import NavBarComponent from './NavBarComponent';

// insted of adding the sidebar component to every page,we can add it only once to PageLayOut component and wrap the children with it. This way ,
// we can  have a sidebar on every page except the authPage

function PageLayoutComponent({ children }) {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);
    const renderSideBar = pathname !== "/auth" && user;
    const rendeerNavBar = !user && !loading && pathname !=="/auth";
    
    // to add loading effect
    const checkingUserAuth = !user && loading;
    if(checkingUserAuth){
        return<PageLayoutSpiner/>;
    }
    return (
        <Flex flexDir={rendeerNavBar ? "column" : "row"}>
            {/* sidebar on left */}
            {renderSideBar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <SidebarComponent />
                </Box>
            ) : null}
            {/* Render NavBar */}
            {rendeerNavBar ? <NavBarComponent/> : null}
            
            {/* the page content on the right */}
            <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
                {children}
            </Box>
        </Flex>
    );
}

export default PageLayoutComponent;

// Spiner Component
const PageLayoutSpiner = ()=>{
    return(
        <Flex flexDir={'column'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Spinner size={'xl'}/>
        </Flex>
    )
}