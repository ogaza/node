# Digging into NodeJS

## Web sites

* [FM Course](https://frontendmasters.com/courses/digging-into-node/)

## Cancellation of stream processing

Kyle Simpson wrote his own tool for cancelling an ongoing stream processing.
The related package can be installed using the NPM.

Here is the package web-site:
[CAF](https://github.com/getify/caf)

And here is the course chapter in which he explains how to use CAF:
[CAF usage](https://frontendmasters.com/courses/digging-into-node/asynchronous-cancellation-timeouts/)

## Node Web Server

### Starting the node web application

Open the src_webserver subfolder in the terminal

Run the command:
```
node server.js
```

## Debugging Node process

When starting a new Node process add the <code>--inspect</code> argument to the CLI command,
for Example:
```
node --inspect server_express.js
```
Now you can attach for example chrome debugger to the process.
Type:

``` bash
chrome://inspect
```
In the address bar.


## Resources
* [Streams](https://frontendmasters.com/courses/networking-streams/)
* [Static Files Serever](https://www.npmjs.com/package/node-static-alias)