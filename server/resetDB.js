var fs = require('fs')
var file = __dirname + '/db/imgs.json'
var sys = require('sys')
var exec = require('child_process').exec
var child

var obj = {
    "imgs": []
}

fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
        console.log('Error: ' + err)
        return
    }
    data = JSON.parse(data)

    fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
})

child = exec("rm -r imgs/*", function(error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
})
