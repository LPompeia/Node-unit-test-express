const express = require("express");
const app = express();

//handlers
const bankRouter = require('./router/bankRouter');

//roteamentos
app.use('/bank', bankRouter);

//captura erros requests
app.use((request, response, next) => { 
  response.status(404).send({
    status: 404, 
    error: 'Not Found'
  })
});

//error server 
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status);
  response.json({
    error: {
      message: error.message
    }
  })
});

//Runing port
app.listen(8080);

module.exports = app;

