import { Toaster } from 'react-hot-toast'
import Navbar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </>
  )
}

export default MyApp
