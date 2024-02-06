import { useEffect, useState } from "react";
import "./App.css";
import {ethers} from 'ethers';
import faucetContract from "./ethereum/faucet";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [WithdrawError, setWithdrawError] = useState("");
  const [WithdrawSuccess, setWithdrawSuccess] = useState("");
  const [TransactionData, setTransactionData] = useState("");   

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //getting the provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get accounts
        const accounts = await provider.send("eth_requestAccounts",[]);
        //get signer 
        setSigner(provider.getSigner()); 
        //get contract instance
        setFcContract(faucetContract(provider));
        /* MetaMask is installed */
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      } 
    } else { 
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //getting the provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get accounts
        const accounts = await provider.send("eth_accounts",[]); 

        if (accounts.length > 0) {
          //get signer 
          setSigner(provider.getSigner());  
          //get contract instance
          setFcContract(faucetContract(provider)); 
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const getDewToken = async () => {
    try {
      const fcContractSigned = fcContract.connect(signer);
      const response = await fcContractSigned.requestTokens();
      console.log(response);   
      setTransactionData(response.hash);
      setWithdrawSuccess("Your DEW tokens will reach your Wallet shortly!!!");
      //getting the provider
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // get accounts
      // await new Promise(resolve => setTimeout(resolve, 40000));
      // const indicator = await provider.send("eth_getTransactionReceipt",[response.hash]); 

      // // const indicator = await window.ethereum.request({
      // //   "method": "eth_getTransactionReceipt",
      // //   "params": [
      // //     response.hash
      // //   ]
      // // });
      // console.log("the indicator is ", indicator);
      // if (indicator.status === "0x1") {
      // }
    } catch(err) {
      console.log(err.message);
      setWithdrawError(err.message);
      
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">DewstarToken (DEW)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0 
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                    
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Claim 100 DEW/day.</p>
            <div className="mt-5">
              {WithdrawError && (
                <div className="withdraw-error">{WithdrawError}</div>
              )}
              {WithdrawSuccess && (
                <div className="withdraw-success">{WithdrawSuccess}</div>
              )} {" "}
            </div>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                    defaultValue={walletAddress}
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium"
                  onClick={getDewToken}
                  disabled={walletAddress ? false : true}
                  >
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>{TransactionData ? 
                    <a href={`https://sepolia.etherscan.io/tx/${TransactionData}`} target="_blank" rel="noopener noreferrer">
                      Transaction hash: {TransactionData}
                    </a> : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
