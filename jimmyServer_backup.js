//var = require('https');
var http= require('http');
var util = require('util');

const fs = require('fs');


/*
var options = {
    key: fs.readFileSync("/home/ubuntu/jimmy/keys/server-key.pem"),
    cert: fs.readFileSync("/home/ubuntu/jimmy/keys/server-crt.pem"),
    ca: [fs.readFileSync("/home/ubuntu/jimmy/keys/ca-crt.pem")]
};
*/

var port = 80;

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});


/*
var server = https.createServer(options,
                                function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
*/


server.on('request', function(request, response) {
    response.writeHead(200);
    console.log("request.url = "+request.url);
    console.log(request.method);
    console.log(request.headers);

    //console.log(request);
    //console.log(JSON.stringify(request));
    /* 
    if(request.url != null){
    	var uri = url.parse(request.url).pathname
,   	filename = path.join(process.cwd(), uri);
        console.log("file name = ",filename);
   	// console.log(request.data.toString());
      	fs.exists(filename, function(exists) {
    	if(!exists) {
      		response.writeHead(404, {"Content-Type": "text/plain"});
      		response.write("404 Not Found\n");
      		response.end();
      		return;
    	}

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
      });
      });
    }else{
    */
         response.write('hi');
         response.end();
    //}
});

server.listen(port, function() {
  console.log((new Date()) + " Server is listening on port :"+port);
});

