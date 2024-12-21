import React, { useEffect, useState } from "react";
import Web3 from "web3";
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Contract ABI provided
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "txHash",
          "type": "bytes32"
        }
      ],
      "name": "PaymentSent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "sendPayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ];

  // Contract Address (provided by you)
  const contractAddress = "0x2309D2107B3ea86fE269F1faEcB966d50c9b1549";

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Request user account access
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAccount(accounts[1]); // Set the first account as default
          console.log("Connected account:", accounts[1]);
        })
        .catch((error) => {
          console.error("Error connecting to MetaMask", error);
        });
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  }, []);

  useEffect(() => {
    if (web3 && account) {
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
    }
  }, [web3, account]);

  const handleSendTransaction = async () => {
    if (!recipientAddress || !amount || !web3 || !contract || !account) {
      alert("Please provide valid input fields and connect your wallet.");
      return;
    }

    try {
      // Send the payment to the recipient
      const transaction = await contract.methods.sendPayment(recipientAddress).send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
      });

      setTransactionHash(transaction.transactionHash);
      console.log("Transaction successful:", transaction);

      // Optionally, you can listen for the PaymentSent event here if needed
      contract.events.PaymentSent({
        filter: { sender: account },
        fromBlock: 'latest'
      })
      .on('data', (event) => {
        console.log('PaymentSent event received:', event);
      })
      .on('error', (error) => {
        console.error('Error listening to PaymentSent event:', error);
      });

    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div className="App">
      <h1>Payment DApp for Microtransactions</h1>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <div>
            <label>
              Recipient Address:
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount (ETH):
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleSendTransaction}>Send Transaction</button>

          {transactionHash && (
            <div>
              <p>Transaction Hash: {transactionHash}</p>
              
            </div>
          )}
        </div>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
    </div>
  );
}

export default App;
