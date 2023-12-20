var express = require('express');
var path = require('path');



var app = express();




// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));




app.use('/',(req, res, next) => {
    res.render('index')
  })




app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
  

