const http = require('http');
const net = require('net');
const { URL } = require('url');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let fname = '';

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    // clientSocket.write('::::::::::WRITTING IN CLIENT SOCKET::::::::::::');
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {

//     const options = {
//         port: 1337,
//         host: '127.0.0.1',
//         method: 'CONNECT',
//         // path: 'www.google.com:80'
//       };


//     rl.question('enter website', (fname) => {
//         console.log(`Requested website is ${fname}!`);
//         options.path = fname.toString() + ':80';
//         rl.close();
    
//   // Make a request to a tunneling proxy
  

//   const req = http.request(options);
//   req.end();

//   req.on('connect', (res, socket, head) => {
//     console.log('got connected!');

//     // Make a request over an HTTP tunnel
//     socket.write('GET / HTTP/1.1\r\n' +
//                  'Host: www.google.com:80\r\n' +
//                  'Connection: close\r\n' +
//                  '\r\n');
//     socket.on('data', (chunk) => {
//       console.log(`:::::::::::::::::::::CHUNKED DATA::::::::::::::::::: \n ${chunk.toString()}`);
//     });
//     socket.on('end', () => {
//       proxy.close();
//     });
//   });
// });
});




// const http = require("http");

// const HTTPServer = http.createServer();

// HTTPServer.on('connection', (socket) => {
//     console.log("connection established");

//     socket.write("connectoin to indes.js established");
//     // socket.send("connectoin to indes.js established");

//     console.log(`${socket}`)
// })

// HTTPServer.listen(8080);