## Modules

<dl>
<dt><a href="#module_portscanner">portscanner</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#checkPortStatus">checkPortStatus(port, [host], timeout)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#findAPortInUse">findAPortInUse(postList, [host])</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#findAPortNotInUse">findAPortNotInUse()</a></dt>
<dd><p>Finds the first port with a status of &#39;closed&#39;, implying the port is not in
use. Accepts identical parameters as <a href="#findAPortInUse">findAPortInUse</a></p>
</dd>
<dt><a href="#findAPortWithStatus">findAPortWithStatus(...params)</a></dt>
<dd></dd>
</dl>

<a name="module_portscanner"></a>

## portscanner
<a name="checkPortStatus"></a>

## checkPortStatus(port, [host], timeout) ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - - [err, success]. success is either of closed/open. Closed if port is not in use, open otherwise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| port | <code>Number</code> |  | Port to check status on. |
| [host] | <code>String</code> | <code>&#x27;127.0.0.1&#x27;</code> | Host of where to scan. |
| timeout | <code>Number</code> | <code>400</code> | timeout. |

<a name="findAPortInUse"></a>

## findAPortInUse(postList, [host]) ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - - [error, port]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| postList | <code>Array</code> |  | Array of ports to check status on. |
| [host] | <code>String</code> | <code>&#x27;127.0.0.1&#x27;</code> | Host of where to scan. |

**Example**  
```js
// scans 3000 and 3002 only, not 3001.
portscanner.findAPortInUse([3000, 3002], console.log)
```
<a name="findAPortNotInUse"></a>

## findAPortNotInUse()
Finds the first port with a status of 'closed', implying the port is not in
use. Accepts identical parameters as [findAPortInUse](#findAPortInUse)

**Kind**: global function  
<a name="findAPortWithStatus"></a>

## findAPortWithStatus(...params)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...params | <code>params</code> | Params as passed exactly to [findAPortInUse](#findAPortInUse) and [findAPortNotInUse](#findAPortNotInUse). |

