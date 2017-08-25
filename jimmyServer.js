//var = require('https');
var https= require('https');
//var http = require('http');
var util = require('util');
//app deps
const deviceModule = require('./node_modules/aws-iot-device-sdk/').device;
const cmdLineProcess = require('./node_modules/aws-iot-device-sdk/examples/lib/cmdline');
const processTest = require('./node_modules/aws-iot-device-sdk/examples/device-example');
const fs = require('fs');







var options = {
    key: fs.readFileSync("/home/ubuntu/jimmy/keys/private.key"),
    cert: fs.readFileSync("/home/ubuntu/jimmy/keys/certificate.crt"),
    //ca: [fs.readFileSync("/home/ubuntu/jimmy/keys/ca-crt.pem")]
};


var port = 443;

/*
var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
*/


var server = https.createServer(options,
                                function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});



var sequence;
var body;
var timestamp;

server.on('request', function(request, response) {

    if (request.method == 'POST') {
    request.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
      body = JSON.parse(chunk.toString());
      sequence = body.sequence;
      timestamp = body.timestamp;
      //console.log("body =" +body);
      //console.log("inner_sequence =" +sequence);
      //console.log("inner_timestamp =" +timestamp);
      timestamp = new Date().getTime();
      //console.log("tttt = ", timestamp);
      response_dingdong(response);
      sendMsg2IOT(body.input_text);
    });
}



});

server.listen(port, function() {
  console.log((new Date()) + " Server is listening on port :"+port);
});

function response_dingdong(response){


    //send2IOT
    //sendMsg2IOT();


    //console.log("after_sequence =" +sequence);
    //console.log("after_timestamp =" +timestamp);

    var responseString = JSON.stringify({
                                        "directive": {
                                                "directive_items": [{
                                                        "content": "\u5df2\u6536\u5230",
                                                        "type": "1"
                                                }]
                                        },
                                        "extend":{"NO_REC":"0"},
                                        "is_end":true,
                                        "sequence":sequence,
                                        "timestamp":timestamp,
                                        "versionid": "1.0"
                                        });
    //console.log("response string : "+responseString.toString());
    //console.log("response string : "+responseString.sequence);
    //console.log("response string : "+responseString.timestamp);
    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8","Accept" : "application/json","Accept-Charset": "UTF-8"});
    response.write(responseString);
    response.end();

}

function sendMsg2IOT(msg){
    console.log("sendMsg2IOT msg = "+msg);

    var arg = {
  help: false,
  h: false,
  debug: false,
  Debug: false,
  D: false,
  'host-name': 'a315tlms9ukhbm.iot.us-east-1.amazonaws.com',
  Host: 'a315tlms9ukhbm.iot.us-east-1.amazonaws.com',
  H: 'a315tlms9ukhbm.iot.us-east-1.amazonaws.com',
  'private-key': '/home/ubuntu/jimmy/iotkeys/Rugby.private.key',
  privateKey: '//home/ubuntu/jimmy/iotkeys/Rugby.private.key',
  k: '/home/ubuntu/jimmy/iotkeys/Rugby.private.key',
  'client-certificate': '/home/ubuntu/jimmy/iotkeys/Rugby.cert.pem',
  clientCert: '/home/ubuntu/jimmy/iotkeys/Rugby.cert.pem',
  c: '/home/ubuntu/jimmy/iotkeys/Rugby.cert.pem',
  'ca-certificate': '//home/ubuntu/jimmy/iotkeys/root-CA.crt',
  caCert: '//home/ubuntu/jimmy/iotkeys/root-CA.crt',
  a: '/home/ubuntu/jimmy/iotkeys/root-CA.crt',
  protocol: 'mqtts',
  Protocol: 'mqtts',
  P: 'mqtts',
  clientId: 'ubuntu86544',
  i: 'ubuntu86544',
  'client-id': 'ubuntu86544',
  testMode: 1,
  t: 1,
  'test-mode': 1,
  baseReconnectTimeMs: 4000,
  r: 4000,
  'reconnect-period-ms': 4000,
  keepAlive: 30,
  K: 30,
  keepalive: 30,
  delay: 4000,
  d: 4000,
  'delay-ms': 4000
    };

  //var myArray = _(arg).toArray();
  //var parsed = JSON.parse(arg);

  //var arr = [];

  //for(var x in parsed){
  //  arr.push(parsed[x]);
  //}

  var para = ["--host-name=a315tlms9ukhbm.iot.us-east-1.amazonaws.com","--private-key=Rugby.private.key","--client-certificate=Rugby.cert.pem","--ca-certificate=root-CA.crt"];

  console.log("para = "+para);
    cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT, test modes 1-2',
    para, processTest, msg);

}


