import { Toaster } from 'react-hot-toast'
import Navbar from '../components/NavBar'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </UserContext.Provider>
  );
}

export default MyApp
