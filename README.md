# Forward-Proxy 1.0
Host Filtration + Activity Tracking (NodeJS)

This is a simple NodeJS Forward Proxy application where you can configure the host filteration.

Features:
* Able to block any number of websites or IP addresses
* Able to track activity of client at all times

1. Run proxy.js file
```
   $ node proxy.js
```
2. Configure your proxy setings to IP: 127.0.0.1 || port: 8888

Thats it!!

3. To configure the settings:
   Open lib/BLOCKED_IPS.js on your text editor and add IPs in BLOCKED_IPS and hostnames in BLOCKED_HOSTS. This will block all traffic to those Blocked IPs and        hosts.
4. To monitor activity:
   Check history.txt file for all activity of all clients.
   

