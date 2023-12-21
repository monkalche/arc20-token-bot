// metamask.js

async function toggleConnect() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          document.getElementById('connectButton').innerText = `${accounts[0]}`;
          alert('MetaMask connected!');
  
          // Fetch balance if connected
          const balance = await getAccountBalance(accounts[0]);
          alert(`Account Balance: ${balance}`);
        }
      } catch (error) {
        console.error(error);
        alert('Error connecting MetaMask');
      }
    } else {
      alert('MetaMask not detected');
    }
  }
  
 async function getAccountBalance(account) {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
  
    
      const wei = balance; // Convert input to a BigInt for precision and from gwei to eth
      const ether = wei / 1000000000000000000;
      return ether;
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return 'Error fetching balance';
    }
  }
  

  module.exports = { getAccountBalance };
  