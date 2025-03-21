import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, gnosisChiado } from 'viem/chains'

// Get projectId from https://cloud.reown.com
export const projectId = '10833e320f55f0b2201776e371ab71b9'
if (!projectId) {
  throw new Error('Project ID is not defined')
}

// We gebruiken Gnosis Chiado testnet voor ontwikkeling
export const networks = [gnosisChiado, mainnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
