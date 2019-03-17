const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
var request = require('request');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('<h1>Testing</h1>');
});

app.post('/',(req,res)=>{
    res.send(req.rawHeaders);
});

app.post('/viber',(req,res)=>{
     res.send(req.body);
    
     if(req.body.message != undefined){
        //  console.log("It is undefined ");
          var messageObject = req.body.message;
          var text = messageObject.text;
          detectIntent(text);
    //  var senderObject = req.body.sender;
     }
    
    //  console.log(messageObject);
    //  console.log(messageObject.text);
    //  console.dir(senderObject);
});

function detectIntent(text){
    const projectId = 'newagent-836c7';

//https://dialogflow.com/docs/agents#settings
// generate session id (currently hard coded)
const sessionId = '981dbc33-7c54-5419-2cce-edf90efd21124214';
const query = text;
const languageCode = 'en-US';


// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
let privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD7ERW754nQqSce\nm9BIXxWgCrDTJJeSvyjcYq42CdRVcTnTIofLNSMNZQU7961cy6R/GeEAZTspo9ut\n7GweZBHPV2fKgNl9BfXrJ/2l23lU6IyFogzSigKkHFThmVRgoLcRZHm/on/zeSR7\niW9i9kmlvJWv+iiQ+yU9tp9uaL87048uRbPv9jjQhCmfWO0zJR9K1HLIlOGfosqU\ndjJSqsajAzHEfv5iAcIrgXmlzT9R7luaN7jRA4HJL8bysbYzdJXdZeORUElkr/Jv\n8V3+pwRlmU1BnNEGLtU0Xep/7UoggyiL2D6G7PZcOuGpqSCUe8lYY7qcK+h7Ro2p\nsDJSAv0XAgMBAAECggEANfy4BDZnM6fUAih2MsHDiC0UVerV7xfNBQrxNCyL7K2S\nxhx0P9WWyoARDpKVRFGD91LMx8V84dja2bzviN9y1veQGYL4gYJhHaZ1TA90OTZi\nVTAB+tnzdG+lLvfGJZsZkpNc/MDIK8Y+epQUkB6uuoVhWLx9saNXoDwfb2H10Tqh\nU/3Ag3g7gDbZbG5wJnOCpo9orUOwhC1FsYlRFCFLu7j/ppvGwy+656bxb6HXOAZQ\nFZ7VUztrCAaq6k8NP5JgHOvJ3WiPcdEyg2/XgyWm9ACzbgPDJQ05yLUJpBhXO9CJ\nKlMvjL0mHKFs/x6yDk9TRWPFA63qtlCGm9Sk2Rx3dQKBgQD/U5VwEGi4U6RX5i//\nqnZIDjFo1EVOM1t+CVch9Elekd+5dbUWnKyG6i0/gRKEQqARYAqD/QNgRobVYWjj\nqbaHQpahwwIevKqoDVdSReROBLviGqWRDgM71WLgGUtTkCEyX1VvLQnY1eZSe77T\n9ukGuzY3e0asJ+ZmVDTGkw3+qwKBgQD7up/oJpEprxrrNrbtdpiapyshxobSXETw\nl5naU6NEyfFoWOYzZTDvTCiVG1eA2avJamF4VKVAkyHyRG9jG4LAdamcz/paUPWB\n9e2ZjPEkYL55eyRjg5OAMdCbu6z5g1pcEVjN2EDREcBVgvRVJz5/R2hhQBr4w2Yq\n+o7oz+QLRQKBgQCukm6FbaK8DOw78TX2P42Z3KJpw2ETg8fVl/tMSuNzVpe6DUHg\nkQThRfHkDpMjfQ5Gcv0dm3uYcwAzmuOFbX9QYfXt6hBkBalFN8Hxjbn4ogH4KTH0\nyLjrSw3MnV7EZrJb55TZa9jkufM9iEBEWvie0pfSPWZnxOwiIQbokpkp+wKBgQCr\n6Z8NN1GJyykyG7K/529+ps3BCkjG3vbB7HbI8Lee4d846QWFcgUCV9ubQQn4WC+G\npV0dhYk52YGkZ3I+l+oqr/B+xFZwWbvg3mg+pk+FDYDni96lC5WvRdX2lSwjVr5e\nBAbGxXo2jc3xWDau9Ncsq0Kwr8v7uc5LacQxYNCXlQKBgQDDj3hyjSnJHFFnutPX\n7wXjliEz7D4OaVqKNzw9k+YfIfeoVcH+NHlpWfxPiVvT1HNtocLAI2XN0+S/R+YU\nSdrrj+8xVzf+AUbhl4LRNLdTXDAxt+7rLknVcre/QAu2xC17OR8alPhQlYxVyXM5\nbdJVPHYdfb9O9qpHBASof6UI+g==\n-----END PRIVATE KEY-----\n';

// as per goolgle json
let clientEmail = "dialogflow-ykemot@newagent-836c7.iam.gserviceaccount.com";
let config = {
  credentials: {
    private_key: privateKey,
    client_email: clientEmail
  }
}
const sessionClient = new dialogflow.SessionsClient(config);

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


// The text query request.
const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };
  
  
  // Send request and log result
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      
      sendResponseViber(result.fulfillmentText);

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


function sendResponseViber(responseText){
    var request = require('request');
    // console.log(responseText);
var req = {
    "receiver":"ObP8YvgpO/HBclg5YdVyWA==",
    "min_api_version":1,
    "sender":{
       "name":"Bot Test",
       "avatar":"https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png"
    },
    "type":"text",
    "text":responseText
 };

 request.post({
    url: 'https://chatapi.viber.com/pa/send_message',
    body: req,
    headers:{
        'X-Viber-Auth-Token' : '495369521be7da88-614637bcefda0139-71f79a9394353172'
    },
    json: true  
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
});
}