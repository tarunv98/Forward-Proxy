const net = require("net");
const validateDest = require('./lib/validateDest');
const fs = require("fs");

const proxyServer = net.createServer(); //this is a TCP server

proxyServer.on('connection', (clientToProxy) => {
  console.log("[PROXY] A Client Got Connected");

  clientToProxy.once('data', (data) => { //here we recieve request from client 
    const request = data.toString();
    const isTLS = request.includes('CONNECT ');// checks whether HTTP or HTTPS
    let dest_ADDR = '';
    let dest_PORT = 0;

    if(isTLS){
      dest_ADDR = request.toString().split('CONNECT ')[1].split(' ')[0].split(':')[0];
      dest_PORT = request.toString().split('CONNECT ')[1].split(' ')[0].split(':')[1];
      //forward request
    }else{
      dest_ADDR = request.toString().split('Host: ')[1].split('\r\n')[0];;
      dest_PORT = 80;
    }
    
    if(validateDest.validateDestAddr(dest_ADDR)){ //Host based filtering
      let proxyToDestServer = net.createConnection({port: dest_PORT, host: dest_ADDR}).on('connect', () => {
        console.log("[PROXY] Connection to destination is setup", dest_ADDR, dest_PORT);
        writeHistory('history.txt', `\n [PROXY][CONNECTED] Client ${clientToProxy.remoteAddress} opened ${dest_ADDR} at ${new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })}`, () => {});

        if (isTLS) {
          clientToProxy.write("HTTP/1.1 200 OK\r\n\n");
        } else {
          proxyToDestServer.write(data);
        }
        
        proxyToDestServer.once('data', (dataa) => {
          console.log(`[PROXY][FROM-DEST] FIRST DATA PACKET \n ${dataa.toString()}`)
        })

        clientToProxy.pipe(proxyToDestServer);
        proxyToDestServer.pipe(clientToProxy);
  
        proxyToDestServer.on('error', (err) => {
          console.log("[PROXY] ** PROXY TO DESTINATION SERVER ERROR **");
          console.log(err);
        });
      })
    }else{
      writeHistory('history.txt', `\n [PROXY][BLOCKED] Client ${clientToProxy.remoteAddress} tried to open ${dest_ADDR} at ${new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })}`, () => {});
      clientToProxy.write(Buffer.from("!!!!!!!!!!!!!!!!!!!!!! CONTENT BLOCKED BY FIREWALL !!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
      clientToProxy.end();
    }
   
    clientToProxy.on('error', err => {
      console.log("[PROXY] ** CLIENT TO PROXY ERROR **");
      console.log(err);
    });
     
    console.log(data.toString());
  })
})

proxyServer.on('error', (err) => {
  console.log("[PROXY] ** PROXY SERVER ERROR **");
  console.log(err);
  throw err;
});

proxyServer.on('close', () => {
  console.log("[PROXY] Client Disconnected");
});

proxyServer.listen(8888, () => {
  console.log("[PROXY] PROXY RUNNING ON PORT 8888")
});

/**
 * 
 * @param {string} file - path to file in which data to be appended
 * @param {string} data - data to be appended
 * @param {function} [callback] - incase there is any callback function to be executed
 */
function writeHistory(file, data, callback){
  try{
    fs.appendFile(file, data, () => {});
  } catch(err){
    console.log("[PROXY][HISTORY][ERROR]");
    console.log(err);
  }
}
