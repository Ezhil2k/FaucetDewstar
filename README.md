# FaucetDewstar

**This is a faucet contract with UI for users to request token and receive DewstarToken(DEW) seamlessly every 24 hours by connecting through their Metamask wallet.**

## URL for the faucet UI
https://dewstarfaucet.netlify.app

## Tech Stack

- **React**: Frontend library for building user interfaces in Ethereum decentralized applications (dApps).
- **ethers js**: A compact library for interacting with the Ethereum Blockchain and its ecosystem.
- **Hardhat**: Ethereum development environment for compiling, testing, and deploying smart contracts.

## Features

- **Token Request**: Can request token every 24 hours.
- **Token Deposit**: The owner can deposit tokens to the faucet.
- **Drain Faucet**: Owner can withraw all tokens when the contract secqurity is compromised.
- **Set Withdraw Amount**: Specify a different withdraw amount. 
- **Set Timegate**: Specify a different timegate for next withdrawl.

## Process

The project started by defining the faucet contract using **Hardhat**. The contract was tested locally and deployment scripts were written to deploy the contract to various sepolia Test networks.

Then a **React** frontend was created to provide the user a way to connect wallet and withdraw DewstarToken every 24 hours. The contract was connected to the frontend using **ether js**.

## Learnings

- Understanding how to use existing contracts in current contract by creating their instance.
- Using ABI in the frontend to get the deployed contract in frontend.
- Using provider, signer from ethers js to invoke the contract.
- Integrating metamask wallet to a frontend.
- Familiarty with react hooks such as useState and useEffect.

## ++ Improvement

Areas for improvement in the project include:

- Add info about the token being provided in the faucet.
- Make UI elements to set withdraw amount and timegate by the owner.

## Running the Project

To run the ERC20 token project locally, follow these steps:

1. Clone the repository: 
``` bash
git clone https://github.com/Ezhil2k/FaucetDewstar.git
```
2. Install dependencies: 
```bash
npm install
```
3. Compile the contracts: 
``` bash
npx hardhat compile
```
4. Deploy the contract: 
```bash
npx hardhat run scripts/deploy.js --network sepolia 
```
5. Verify the contract: 
```bash 
npx hardhat verify --network sepolia <address> <arguments>
```

### Environment Variables

Below are the required environment variables for the project:

- `PRIVATE_KEY`: The private key used for accessing Ethereum accounts or signing transactions.
- `SEPOLIA_INFURA_ENDPOINT`: The endpoint URL for the Infura node used for interacting with the Ethereum network.
- `ETHERSCAN_KEY`: Your API key for Etherscan, which may be used for contract verification or accessing Etherscan's API.

## Check the faucet contract in sepolia etherscan : 
https://sepolia.etherscan.io/address/0xb5317070e60a7aa53010a8351260E1945869435f
