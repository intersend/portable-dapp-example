import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon } from 'wagmi/chains'
import { createClient } from 'viem'
import { safe } from 'wagmi/connectors'



export const config = createConfig({
    chains: [mainnet, sepolia, polygon],
    connectors: [safe()
    // walletConnect({
    //     projectId: '',
    // })
    ],
    client({ chain }) {
      return createClient({ chain, transport: http() })
    },
  })