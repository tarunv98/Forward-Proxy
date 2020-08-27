// const BLOCKED_IPS = require("./BLOCKED_IPS");

// const { BLOCKED_IPS } = require("./BLOCKED_IPS");

// const { BLOCKED_IPS } = require("./BLOCKED_IPS");

// let isLoggedin = false;

if(isLoggedin){
    document.getElementById('login').innerHTML = '';
}
function dispdata(){
    BLOCKED_IPS = {
        BLOCKED_IPS: [
            '123',
            '321'
        ],
        BLOCKED_HOSTS: [
            'google',
            'yahoo'
        ]
    };
if(isLoggedin){
    let ips = '';
    let hosts = '';
    for(let IP of BLOCKED_IPS.BLOCKED_IPS){
        ips = ips + '\n' + IP.toString();
    }
    document.getElementById('iplist').innerHTML = `<h3>BLOCKED IPS</h3>\
    <li>${ips}</li>\
    <input type = "text" id = "ip">\
    <button type = "button" name = "button" onclick = "addIP()">ADD IP</button>`
    for(let HOST of BLOCKED_IPS.BLOCKED_HOSTS){
        hosts = hosts + '</li>\ <li>' + HOST.toString();
    }
    document.getElementById('hostlist').innerHTML = `<h3>BLOCKED HOSTS</h3>\
    <li>${hosts}</li>\
    <input type = "text" id = "host">\
    <button type = "button" name = "button" onclick = "addHost()">ADD HOST</button>`
}
}

function login(){
    console.log('HELLO', document.getElementById('password').value)
    if(document.getElementById('password').value === 'admin123'){
        isLoggedin = true;
        dispdata();
    }
}

function addIP(){
    console.log(document.getElementById('ip').value);
    BLOCKED_IPS.BLOCKED_IPS.push(document.getElementById('ip').value.toString());
}  
function addHost(){
    console.log(document.getElementById('host').value);
    BLOCKED_IPS.BLOCKED_HOSTS.push(document.getElementById('host').value.toString());
}