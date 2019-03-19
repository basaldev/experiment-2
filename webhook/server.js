// server.js
// where your node app starts

// init project
const express = require('express');
const fetch = require('node-fetch');
const cors = require('express-cors');
const find = require('lodash.find');
const app = express();
const symptomsLookup = require('./symptons');
const { WebhookClient } = require('dialogflow-fulfillment');
const sample = require('lodash.sample');

app.use(express.json());
app.use(cors())
const CryptoJS = require('crypto-js');
function getKey(){
const uri = 'https://authservice.priaid.ch/login';
const liveAccounts = [
 {
 username: 'Qp73N_EXODEVHUB_COM_AUT', // INFO
 password: 'n2SKr7g3C8Wkd5X9L'
 },
 {
 username: 'i3L2K_GMAIL_COM_AUT', // ALEX
 password: 'o7E9KgQx24SyCc83F'
 }
];
const { username, password } = sample(liveAccounts);
let API_KEY;
const computedHashString = CryptoJS.HmacMD5(uri, password).toString(CryptoJS.enc.Base64);
  return fetch(uri, {
   method: 'POST',
   headers: {
   Accept: 'application/json',
   Authorization: `Bearer ${username}:${computedHashString}`
   }
  })
 .then(res => res.json())
}

function getDiagnose(token, birthYear, gender, symptoms) {
  const foundSymptoms = symptoms.map(single => {
    const found = symptomsLookup.find(el => el.Name.toLowerCase() === single.toLowerCase().trim());
    return found.ID;
  })
  const LANGUAGE = "en-gb"
  const YEAR_OF_BIRTH = birthYear ? birthYear : '1991';
  const GENDER = gender ? gender : 'male';
  const SYMPTOMS = `[${foundSymptoms.join(',')}]`;
  const endpoint = "https://healthservice.priaid.ch/diagnosis"
  const url = `${endpoint}?language=${LANGUAGE}&gender=${GENDER}&year_of_birth=${YEAR_OF_BIRTH}&symptoms=${SYMPTOMS}&token=${token}`;
  return fetch(url).then(res => res.json())
}

// http://expressjs.com/en/starter/basic-routing.html
app.get('/chat/:message', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  fetch(`https://console.dialogflow.com/api-client/demo/embedded/5400840e-7191-48f2-ad8b-e9240e452fdf/demoQuery?q=${request.params.message}&sessionId=2d615127-dd39-ced7-c5b8-497e777bd146`)
    .then(res => res.json())
    .then(body => {
    response.send(body);
  });
});

app.post('/webhook', function(req, res){
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set('SymptomFinder', async (agent) => {
      const key = await getKey();
      const diagnose = await getDiagnose(key.Token, agent.parameters.age, agent.parameters.gender, req.body.queryResult.parameters.symptoms);
      if(diagnose.length === 0 && req.body.queryResult.parameters.symptoms.length > 1) {
        agent.add(`There doesn't seem to be a diagnose for that combination, try searching these symptoms indiviually`);
      } else {
        if(diagnose.length > 3) {
          agent.add(JSON.stringify(diagnose.slice(0, 3)));
        } else {
          agent.add(JSON.stringify(diagnose));
        }
      }
    });
    agent.handleRequest(intentMap);
})

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
