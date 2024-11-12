import { useAccount, useConnect, useDisconnect, useEstimateGas, useSendTransaction, useSimulateContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'

// Example ERC20 ABI (minimal)
const ERC20_ABI = [
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  }
] as const

function DemoTransaction() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // ETH Transfer Example
  const { data: gasEstimate } = useEstimateGas({
    to: '0x0000000000000000000000000000000000000000',
    value: parseEther('0.001'),
  })
  const { sendTransaction } = useSendTransaction()

  // Contract Interaction Example
  const { data: simulateData } = useSimulateContract({
    address: '0x1234567890123456789012345678901234567890', // Example ERC20 contract
    abi: ERC20_ABI,
    functionName: 'transfer',
    args: ['0x0000000000000000000000000000000000000000', parseEther('1')]
  })
  const { writeContract } = useWriteContract()

  if (!isConnected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>Connect Wallet</h2>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            style={{ padding: '10px', margin: '5px' }}
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      <div>
        <strong>Connected Address:</strong> {address}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => disconnect()}
          style={{ padding: '10px' }}
        >
          Disconnect
        </button>

        <button
          onClick={() => {
            if (gasEstimate) {
              sendTransaction({
                gas: gasEstimate,
                to: '0x0000000000000000000000000000000000000000',
                value: parseEther('0.001'),
              })
            }
          }}
          disabled={!gasEstimate}
          style={{ padding: '10px' }}
        >
          Send 0.001 ETH
        </button>

        <button
          onClick={() => {
            if (simulateData?.request) {
              writeContract(simulateData.request)
            }
          }}
          disabled={!simulateData?.request}
          style={{ padding: '10px' }}
        >
          Transfer ERC20
        </button>
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>Gas Estimate for ETH transfer: {gasEstimate?.toString()}</p>
        <p>Contract simulation status: {simulateData ? 'Ready' : 'Not ready'}</p>
      </div>
    </div>
  )
}

export default DemoTransaction