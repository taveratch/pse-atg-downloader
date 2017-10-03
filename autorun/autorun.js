var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'ATG Downloader',
    description: 'Autorun script for ATG Downloader.',
    script: 'C:\\Program Files\\ATG\\helloworld.js',
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();