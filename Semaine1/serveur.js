const http = require('http');

const server = http.createServer((request, response) => {
	
	response.statusCode = 200; //OK
	response.setHeader('Content-Type' , 'text/plain');
	response.end('Bonjour mon premier serveur.');
	
});
server.listen(1337,'127.0.0.1',()=> {
	console.log('Le serveur est en fonction');
});