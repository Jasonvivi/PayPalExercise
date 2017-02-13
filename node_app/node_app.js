/**
 * Created by jason on 2/11/17.
 */
var http = require('http');

function onRequest(request, response){
    var body = "";
    request.on('data', function (chunk) {
        body += chunk;
    });
    request.on('end', function () {
        console.log('body: ' + body);
    })
    response.writeHead(200,{"Content-Type":"application/json"});
    var data = {};
    data['response'] = {
        'listings':[
            {'title':'Ship to', 'heading':'Kenneth Thomepson', 'subheading':'8114 Grow Drive #9, Cape Neddick, ME 03902'},
            {'title':'Pay with','heading':'BANK OF AMERICA CHECKING x-5567', 'subheading':'Visa x-4512(backup)'},
        ],
        'total':'$28.98',
        'error':'200',
    }
    response.write(JSON.stringify(data));
    response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server is now running");