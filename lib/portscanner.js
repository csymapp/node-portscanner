const net = require('net')
const Socket = net.Socket
const isNumberLike = require('is-number-like')
const to = require('await-to-js').to

/**
 * Finds the first port with a status of 'open', implying the port is in use and
 * there is likely a service listening on it.
 */
/**
 * @param {Number} startPort - Port to begin status check on (inclusive).
 * @param {Number} [endPort=65535] - Last port to check status on (inclusive).
 * @param {String} [host='127.0.0.1'] - Host of where to scan.
 * @returns {string[]} - [error, result]
 * @example
 * // scans through 3000 to 3002 (inclusive)
 * portscanner.findAPortInUse(3000, 3002, '127.0.0.1')
 * @example
 * // scans through 3000 to 65535 on '127.0.0.1'
 * portscanner.findAPortInUse(3000)
 */

/**
 * Checks the status of an individual port.
 */
/**
 * @param {Number} port - Port to check status on.
 * @param {String} [host='127.0.0.1'] - Host of where to scan.
 * @param {Number} timeout - timeout.
 * @returns {string[]} - [err, success]. success is either of closed/open. Closed if port is not in use, open otherwise
 */
async function checkPortStatus(port, host = '127.0.0.1', timeout = 400) {
  let connectionRefused = false

  let socket = new Socket()
  let status = null
  let error = null

  return new Promise((resolve, reject) => {
    // Socket connection established, port is open
    socket.on('connect', () => {
      status = 'open'
      socket.destroy()
    })

    // If no response, assume port is not listening
    socket.setTimeout(timeout)
    socket.on('timeout', () => {
      status = 'closed'
      error = new Error('Timeout (' + timeout + 'ms) occurred waiting for ' + host + ':' + port + ' to be available')
      socket.destroy()
    })

    // Assuming the port is not open if an error. May need to refine based on
    // exception
    socket.on('error', (exception) => {
      if (exception.code !== 'ECONNREFUSED') {
        error = exception
      } else {
        connectionRefused = true
      }
      status = 'closed'
    })

    // Return after the socket has closed
    socket.on('close', function (exception) {
      if (exception && !connectionRefused) { error = error || exception } else { error = null }
      // callback(error, status)
      if (error) {
        reject(error)
      } else {
        resolve(status)
      }
    })
    socket.connect(port, host)
  })
}


/**
 * @param {Array} postList - Array of ports to check status on.
 * @param {String} [host='127.0.0.1'] - Host of where to scan.
 * @returns {string[]} - [error, port]
 * @example
 * // scans 3000 and 3002 only, not 3001.
 * portscanner.findAPortInUse([3000, 3002], console.log)
 */
async function findAPortInUse() {
  let params = [].slice.call(arguments)
  params.unshift('open')
  return new Promise(async (resolve, reject) => {
    let [err, care] = await to(findAPortWithStatus(params));
    if (err) {
      return reject(err)
    }
    resolve(care)
  })
}

/**
 * Finds the first port with a status of 'closed', implying the port is not in
 * use. Accepts identical parameters as {@link findAPortInUse}
 */
async function findAPortNotInUse() {
  let params = [].slice.call(arguments)
  params.unshift('closed')
  return new Promise(async (resolve, reject) => {
    let [err, care] = await to(findAPortWithStatus(params));
    if (err) {
      return reject(err)
    }
    resolve(care)
  })
}

/**
 * @param {...params} params - Params as passed exactly to {@link findAPortInUse} and {@link findAPortNotInUse}.
 */
async function findAPortWithStatus(params) {
  // Check the status of each port until one with a matching status has been
  // found or the range of ports has been exhausted
  return new Promise(async (resolve, reject) => {
    let startPort, endPort, portList, host, opts, status
    status = params.shift();

    if (params[0] instanceof Array) {
      portList = params[0]
    } else if (isNumberLike(params[0])) {
      startPort = parseInt(params[0], 10)
    }

    if (typeof params[1] === 'string') {
      host = params[1]
    } else if (typeof params[1] === 'object') {
      opts = params[1]
    } else if (isNumberLike(params[1])) {
      endPort = parseInt(params[1], 10)
    }

    if (typeof params[2] === 'string') {
      host = params[2]
    } else if (typeof params[2] === 'object') {
      opts = params[2]
    }

    opts = opts || {}

    host = host || opts.host

    if (startPort && endPort && endPort < startPort) {
      // WARNING: endPort less than startPort. Using endPort as startPort & vice versa.
      let tempStartPort = startPort
      startPort = endPort
      endPort = tempStartPort
    }

    endPort = endPort || 65535
    let foundPort = false
    let numberOfPortsChecked = 0
    let port = portList ? portList[0] : startPort

    // Returns true if a port with matching status has been found or if checked
    // the entire range of ports
    let hasFoundPort = function () {
      return foundPort || numberOfPortsChecked === (portList ? portList.length : endPort - startPort + 1)
    }

    while (true) {
      let [portError, statusOfPort] = await to(checkPortStatus(port, host));
      if (portError) {
        return reject(portError)
      }
      if (statusOfPort === status) {
        return resolve(port)
      }
      numberOfPortsChecked++;
      port = portList ? portList[numberOfPortsChecked] : port + 1;
      if (hasFoundPort()) {
        return reject('No port found ' + status)
      }
    }
  })
}

/**
 * @exports portscanner
 */

module.exports = {
  findAPortInUse: findAPortInUse,
  findAPortNotInUse: findAPortNotInUse,
  checkPortStatus: checkPortStatus
}
