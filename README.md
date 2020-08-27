# Forward-Proxy 1.0
Forward Proxy + Host Filtration (NodeJS)

This is a simple NodeJS Forward Proxy application where you can configure the host filteration.

1. Run proxy.js file
   $ node proxy.js

2. Configure your proxy setings to IP: 127.0.0.1 || port: 8888

Thats it!!

3. To configure the settings:
   Open lib/BLOCKED_IPS.js on your text editor and add IPs in BLOCKED_IPS and hostnames in BLOCKED_HOSTS. This will block all traffic to those Blocked IPs and hosts.

