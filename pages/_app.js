import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { MebloredProvider } from '../context/MebloredContext'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <MebloredProvider>
        <Component {...pageProps} />
      </MebloredProvider>
    </MoralisProvider>
  )
}

export default MyApp
