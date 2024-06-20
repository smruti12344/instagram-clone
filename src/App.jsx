
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePageComponent from './Components/HomePageComponent'
import AuthPageComponent from './Components/AuthPageComponent'
import PageLayoutComponent from './Components/PageLayoutComponent'
import ProfilePage from './Components/ProfilePage'
import { auth } from './firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
    //Authentication for user login and logout
    const [authUser] = useAuthState(auth);
    // console.log(authUser);
  return (
    <PageLayoutComponent >
    {/* configure  nested routes */}
     <Routes>
      <Route path='/' element={authUser ? <HomePageComponent/> : <Navigate to="/auth"/>}/>
      <Route path='/auth' element={!authUser ? <AuthPageComponent/> : <Navigate to="/"/> }/>
      <Route path='/:username' element={<ProfilePage/>}/>
      
     </Routes>
    </PageLayoutComponent>
  )
}

export default App
