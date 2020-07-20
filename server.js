const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) =>{
      if(err){
          console.log('unable to create file');
      } 
   });
   next();
});

/*app.use((req, res, next) =>{
   res.render('maintenance.hbs');
});*/

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
   return new Date().getFullYear(); 
});
hbs.registerHelper('soundIt', (text) =>{
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/', (req, res) =>{
   res.render('home.hbs', {
       pageTitle: 'home',
       welcome: 'welcome to the homepage',
   }); 
});

app.get('/about', (req, res) =>{
   res.render('about.hbs', {
       pageTitle: 'About handlebar page',
   });
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});