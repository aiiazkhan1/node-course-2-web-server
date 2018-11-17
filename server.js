const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var data = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',data+'\n', (err) => {
    if(err){
      console.log('Unable to write to log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});




app.get('/',(req,res) =>{
  // res.send("<h1>Hello Express!</h1>");
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMsg:'Hello and Welcome to the site',
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
})

app.get('/bad',(req,res) =>{
  // res.send("<h1>Hello Express!</h1>");
  res.send({
    errorMessage:'Error. Request failed'
  });
});


app.listen(3000, () => {
  console.log('Server is up on part 3000');
});
