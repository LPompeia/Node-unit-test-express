const fetch = require('node-fetch');

exports.getClients = async (request, response) => { 

    const ambiente = request.params.ambiente;
    console.log('Parametro ambiente:' + ambiente);

    const BANK_HOLIDAY_URL = "https://www.gov.uk/bank-holidays.json";
    console.log('chamada service: ' + BANK_HOLIDAY_URL)
    return await fetch(BANK_HOLIDAY_URL)
        .then(res => res.json())
        .then(json => response.json(json))
        .catch(err => { 
            response.status(404).send({
                status: 404,
                error: err
            })
        })
}

