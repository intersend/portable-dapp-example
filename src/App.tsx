import './App.css'
import { WagmiProvider } from 'wagmi'
import {PortabilityProvider} from 'universal-portability'
import DemoTransaction from './components/DemoTransaction'
import { config } from './wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <PortabilityProvider>
        <div className="App">
          <h1>Sample dApp</h1>
          <DemoTransaction />
        </div>
      </PortabilityProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
