<h1>Vision</h1>
To automate ARC-20 minting and selling while utilizing gas prices, and possibly (envisioned) market prices as well.

There are four inputs that control the bot.
<ol>
<li>Target Token Address: which ARC-20 token the bot will mint and list</li>
<li>Percent of Wallet To Mint: the % amount of AVAX in your wallet to use when minting. Be careful.</li>
<li>Mint Gas: Price in GWEI to mint. Lower is better.</li>
<li>List Gas: Price in GWEI to list onto the https://avascriptions.com marketplace.</li>
<ol>

<h3>Below is the initial draft of the design. Token address field has been replaced with Data Hex.<h3>







![Mock image of site plan](./bot.png)






<h1>Requirements<h1>
To use, enter your private key in the .env.

You must also fill in an endpoint to retreive local gas prices in the .env.