const portScanner = require('../lib/portscanner.js')
const to = require('await-to-js').to;

it("Should check for ports in use", async() => {
  let [err, care] = [];
  let status;  
  // Checks the status of an individual port.
  [err, care] = await to(portScanner.checkPortStatus(3005, '127.0.0.1'));
  status = care;
  if (err) {
      console.error(err)
  } else {
      console.log('Status at port 3005 is ' + status)
  }
})

it("Should check for ports in use", async() => {
  let [err, care] = [];
  [err, care] = await to(portScanner.findAPortNotInUse([80,3000, 3010], '127.0.0.1'));
    port = care
    if (err) {
        console.error(err)
    } else {
        console.log('Found a closed port at ' + port)
    }
})


// it("Should check for ports not in use", () => {
//   let packageJson = etc.packageJson();
//   console.log(packageJson)
//   if (!areEqual(packageJson, require('../package.json'))) {
//     throw "Not package.json"
//   }
// })