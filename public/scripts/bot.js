require("dotenv").config();
const { Web3 } = require("web3");

//const EventEmitter = require('events');

// Usage:
const providerUrl = process.env.PROVIDER_URL; // Replace with your Ethereum provider URL
const walletAddress = process.env.WALLET_ADDRESS; // Replace with your contract address
const privateKey = process.env.PRIVATE_KEY; // Replace with your private key

class MintyBot {
  constructor() {
    this.web3 = new Web3(providerUrl);
    this.walletAddress = walletAddress;
    this.privateKey = privateKey;

    this.currentGas = 0;
    this.mintGas = 0;
    this.listGas = 2000;
    this.mintData = ""; // Placeholder for mint data

    this.walletTotalAvax = 0;
    this.percentToMint = 10;
    this.percentToMintFromTotal = 0;

    //this.eventEmitter = new EventEmitter();

    this.canBuy = false;
    this.intervalBetweenOperation = 60000; // Default interval in milliseconds
    console.log("created");
  }

  async checkGas() {
    try {
      const NODE_URL = process.env.CHAINLINK_NODE_URL;
      const web3 = new Web3(NODE_URL);

      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceInGwei = web3.utils.fromWei(gasPrice, "gwei");

      this.currentGas = gasPriceInGwei;
      console.log("Gas Price:", gasPriceInGwei);
      if (this.currentGas < this.mintGas) {
        //this.eventEmitter.emit('belowGasThreshold', this.currentGas);
        console.log("below mint gas of " + this.mintGas + " MINTING");
        this.mint(this.mintData);
      } else if (this.listGas > this.currentGas) {
        // this.eventEmitter.emit('aboveGasThreshold', this.currentGas);
        console.log("above list gas of: " + this.listGas + " LISTING");
      } else {
        // this.eventEmitter.emit('regularGas', this.currentGas);
        console.log("Gas is in threshold: " + this.currentGas);
      }
    } catch (error) {
      console.error("Error fetching gas price:", error);
      this.currentGas = "N/A"; // Handle error by assigning a default value
    }
  }

  async walletBalance() {
    try {
      const balance = await this.web3.eth.getBalance(this.walletAddress);
      // Convert balance from Wei to Ether
      const balanceInEther = this.web3.utils.fromWei(balance, "ether");
      console.log("Wallet balance:", balanceInEther);
      this.walletTotalAvax = balanceInEther;
      this.percentToMintFromTotal = this.percentToMint * balanceInEther;
      return balanceInEther;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return "N/A"; // Handle error by assigning a default value
    }
  }

  async mint(mintData) {
    if (this.walletTotalAvax > 0.1) {
      console.log("minting");

      const block = await this.web3.eth.getBlock("latest");

      const baseFee = block.baseFeePerGas;

      try {
        const mintDataHex = mintData;

        const transactionObject = {
          from: this.walletAddress,
          to: this.walletAddress,
          gas: 80000, // Adjust as needed
          gasPrice: baseFee.toString(),
          value: 0,
          data: mintDataHex,
        };

        const signedTx = await this.web3.eth.accounts.signTransaction(
          transactionObject,
          privateKey
        );
        const receipt = await this.web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );

        console.log("Token minted:", receipt);
      } catch (error) {
        console.error("Minting failed:", error);
      }
    } else {
      console.log("not enough avax in wallet");
    }
  }

  async list(maxTokenAmount, mintData, marketPrice) {
    // Logic to list tokens
    // Use this.web3, this.contractAddress, this.privateKey
  }

  async startBot() {
    setInterval(async () => {
      await this.walletBalance();
      await this.checkGas();
    }, this.intervalBetweenOperation);
  }

  async getMaxTokenAmount(address) {
    // Logic to get the maximum token amount at an address
    // Use this.web3 and this.contractAddress
  }

  async getMarketPrice() {
    // Logic to get market price
    // Use this.web3 and this.contractAddress
  }

  speak() {
    console.log("we working baby");
  }
}

module.exports = MintyBot;
