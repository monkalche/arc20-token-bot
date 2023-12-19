require("dotenv").config();

const { Web3 } = require("web3");

const NODE_URL = process.env.CHAINLINK_NODE_URL;

const web3 = new Web3(NODE_URL);

function retrieveGas() {
  web3.eth
    .getGasPrice()
    .then((gasPrice) => {
      const gasPriceInGwei = web3.utils.fromWei(gasPrice, "gwei");
      console.log("Current gas price (in Gwei):", gasPriceInGwei);
    })
    .catch((error) => {
      console.error("Error fetching gas price:", error);
    });
}

module.exports = { retrieveGas };