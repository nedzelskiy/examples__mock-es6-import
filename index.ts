'use strict';

import * as shortid from 'shortid';
import * as http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(shortid());
}).listen(4000, ()=> {
	console.log('Server is running on localhost:4000!');
});

export default server;