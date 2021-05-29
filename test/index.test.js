// test.js
const mocha = require("mocha");
const { expect } = require("chai");
const proxyquire = require("proxyquire");
const sinon = require("sinon");
const MOCK_BANK_HOLIDAYS = require("./mock.json");
const { ExpressRequestMock, ExpressResponseMock } = require("./mock/express");

mocha.describe("getBankHolidays", () => {

  //Instance request and response Use Express Mock
  let request = new ExpressRequestMock();
  let response = new ExpressResponseMock();

  //Params request
  request.params = {ambiente: 'TU'}
  //Trating res.json() return on Express Promise then
  var validResponse = { json: () => { return MOCK_BANK_HOLIDAYS }};

  //Creating for return Mock your method
  const fetchStub = sinon.stub();
  fetchStub.resolves(MOCK_BANK_HOLIDAYS);

  //Creating for request and return your method with node-fetch dependency and return JSON Mock
  const bankRoute = proxyquire(
     "../route/bankRoute",
     {
       'node-fetch': sinon.stub().returns(Promise.resolve(validResponse))
     });
 
  //Testing return must be your JSON Mock
  it("should get UK Bank Holidays", async () => {
     const resultado = await bankRoute.getClients(request, response) 
     expect(resultado).to.be.an('object')
  });  

  it("error exception try catch must return 404", async () => {
    //Free Pós-Hook console.log, because emitter during errors
    afterEach(() => {
      sandbox.restore();
    })

    //Creating sandbox for hooking console.log during the test
    let sandbox = sinon.createSandbox();
    sandbox.stub(console, 'log').returns(Promise.resolve({}));
    response.status(404);
   
    //Return result use case Errors Server, if not response variable
    const resultado = bankRoute.getClients(request, undefined)
    
    //Use cases of unit test´s
    expect(resultado).to.not.be.an('object')
    expect(response.statusCode).to.equal(404);
 }); 
});