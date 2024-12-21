# Microtransaction Payment DApp

## Description
The **Microtransaction Payment DApp** enables seamless small Ether transfers between Ethereum accounts using a decentralized application (DApp). It consists of a smart contract written in Solidity, deployed using Truffle, and a React.js-based frontend for user interaction. The DApp allows users to specify a recipient's Ethereum address, the amount to transfer, and view the transaction hash and status.

## Features
- Deploy and interact with a Solidity smart contract.
- Perform microtransactions between Ethereum accounts.
- Real-time updates on transaction confirmation status.
- A user-friendly frontend powered by React.js.
- Compatible with Ganache, MetaMask, and Truffle Suite for local development.

## Prerequisites
- Node.js (version18 recommended)
- npm or Yarn package manager
- Ganache (for a local Ethereum blockchain)
- Truffle Suite (for smart contract development)
  use command ```npm install -g truffle``` to install truffle
- MetaMask extension (for browser-based Ethereum wallet)

## Steps to implement
- Create a directory
  ```mkdir Microtransactions```
- Now change directory to Microtransactions
  ```cd Microtransactions```
- Now use ```truffle init```, this command sets up the basic structure required for developing, testing, and deploying Ethereum smart contracts using the Truffle framework.
- Use ```code .``` to redirect to visual studios.
- Create smart contract in contracts folder with .sol extension.
- Create deploying code in migrations folder with .js extension, the file must start with numerical.
- Open Ganache.
- Modify truffle_config.js according to your requirements.
- In truffle project run ```truffle migrate``` to deploy the contract in local ganache blockchain.
- In the root of your project create a new React app
  ```npx create-react-app client```
  ```cd client```
  ```npm install web3```
- Replace the code of App.js with above.
- After deploying the contract, get the ABI from the build/contracts/Payment.json file generated by Truffle. Copy the abi section and paste it into the contractABI variable.
- In react app's folder run ```npm start```
- Connect MetaMask to Ganache:
  RPC URL: ```http://127.0.0.1:7545```
  Chain ID: ```1337```
  Import an account from Ganache into MetaMask.
  Connect MetaMask to Your DApp: When you load the DApp, click "Connect Wallet" to allow MetaMask to connect to your Ethereum account.
- Open the app in your browser (usually at http://localhost:3000).
  Connect MetaMask: Click "Connect Wallet" and choose an account.
  Send Payment: Enter the recipient's address and the amount of Ether to send. Click "Send Payment."
  View Transaction Status: After the transaction is completed, the transaction hash and status will appear on the screen.
