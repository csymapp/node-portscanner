
const portScanner = require('../lib/portscanner');
const to = require('await-to-js').to;

let main = async () => {
    let [err, care] = [];
    let status;
    let port;
    
    // Checks the status of an individual port.
    [err, care] = await to(portScanner.checkPortStatus(3005, '127.0.0.1'));
    status = care;
    if (err) {
        console.error(err)
    } else {
        console.log('Status at port 3005 is ' + status)
    }
    [err, care] = await to(portScanner.checkPortStatus(2999, '127.0.0.1'));
    status = care;
    if (err) {
        console.error(err)
    } else {
        console.log('Status at port 2999 is ' + status)
    }
    [err, care] = await to(portScanner.checkPortStatus(3000, '127.0.0.1'));
    status = care;
    if (err) {
        console.error(err)
    } else {
        console.log('Status at port 3000 is ' + status)
    }
    [err, care] = await to(portScanner.checkPortStatus(3001, '127.0.0.1'));
    status = care;
    if (err) {
        console.error(err)
    } else {
        console.log('Status at port 3001 is ' + status)
    }

    // Finds a port that a service is listening on
    [err, care] = await to(portScanner.findAPortInUse(2900, 3010, '127.0.0.1'));
    port = care
    if (err) {
        console.error(err)
    } else {
        console.log('Found an open port at ' + port)
    }

    [err, care] = await to(portScanner.findAPortNotInUse([80,3000, 3010], '127.0.0.1'));
    port = care
    if (err) {
        console.error(err)
    } else {
        console.log('Found a closed port at ' + port)
    }
}

main()