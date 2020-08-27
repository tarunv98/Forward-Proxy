const dns = require('dns');
const BLOCKED_IPS = require('./BLOCKED_IPS');
// const { connect } = require('http2');

let host_ADDR = '';


exports.validateDestAddr = function validateDestAddr(hostname) {
    for(let HOST of BLOCKED_IPS.BLOCKED_HOSTS){
        console.log(HOST, hostname);
        if(hostname.toString().includes(HOST)){
            console.log("[PROXY][HOST-VALIDATION] Blocked Host");
            return false;
        }
    }

    dns.lookup(hostname.toString(), (err, address, family) => {
        console.log("[PROXY][HOST-VALIDATION] IP Fetched");
        host_ADDR = address;
        if(err){
            host_ADDR = hostname.toString();//IMPROPER HANDLING
        }
    });

    for(let IP of BLOCKED_IPS.BLOCKED_IPS){
        console.log(IP, host_ADDR);
        if(IP === host_ADDR){
            console.log("[PROXY][HOST-VALIDATION] Blocked Host");
            return false;
        }
    }

    console.log("[PROXY][HOST-VALIDATION] Okay! Proceed to", host_ADDR);
    return true;
}