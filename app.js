const express = require('express');
const path = require('path');



const MintyBot = require('./public/scripts/bot.js')

const app = express();



app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

const mintyBot = new MintyBot();


  



app.use('/create', async (req, res, next) => {
    try {
      await mintyBot.checkGas();
      const currentGas = mintyBot.currentGas;
      const currentBalance = await mintyBot.walletBalance();
      mintyBot.currentGas = mintyBot.checkGas();

  
      res.render('index', {
        gas: currentGas,
        balance: currentBalance
      });
    } catch (error) {
      console.error('Error:', error);
      res.render('index', { gas: 'N/A', balance: 'N/A' }); // Handle error in rendering
    }
  });


app.post('/startBot', async (req, res) => {
  
  
  
  try {
    const { mintDataHex, percentToMint, mintGas, listGas } = req.body;
    console.log('Received form data:', { mintDataHex, percentToMint, mintGas, listGas });
    // Further processing with received form data


 


    
    mintyBot.mintGas = mintGas;
    mintyBot.listGas = listGas;
    mintyBot.mintData = mintDataHex; 
    mintyBot.percentToMint = percentToMint
    mintyBot.startBot();

    // Redirect to a success page or handle response
    res.render('botinfo', {
        botData :  mintyBot ,
    })


  } catch (error) {
    console.error('Error processing form data:', error);
    res.redirect('/error'); // Redirect to an error page or handle response
  }
});



app.use('/error', async (req, res) => {
    console.log("loading bot failed/bot has terminated")
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
