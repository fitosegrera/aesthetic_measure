var express = require('express')
var app = express()
var io = require('socket.io');
var serv_io = io.listen(3300);
var fs = require('fs')
var file = __dirname + '/db/imgs.json'

//Set the ap to serve static files in the folder /public
app.use('/static', express.static(__dirname + '/public'))

//Create a route called aesthetic measure to serve index.html
app.get('/aesthetic_measure', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
    serv_io.on('connection', function(socket) {
        readDB(file, function(dbData) {
            console.log("Rendering page...")
            console.log("Data is of type: " + typeof(dbData))
            socket.emit('img', dbData)
        })
    })
})

//Create a second route to write and retreive data from and to the DIY Database...
// for the request "/db?iname=foo...." --> req.query.q is "foo"
app.get('/db', function(req, res) {
    writeToDb(req.query.iname, req.query.total, req.query.vertical, req.query.horizontal)
    console.log(req.query.iname)
    res.end()
})

//Create a third route called image
app.get('/image', function(req, res) {
    res.sendFile(__dirname + '/public/image.html')
    serv_io.on('connection', function(socket) {
        readDB(file, function(dbData) {
            readData = dbData
            q = req.query.name
            var dataToSend;
            for (var i = 0; i < readData.imgs.length; i++) {
                if (readData.imgs[i].file == q) {
                    dataToSend = readData.imgs[i]
                    console.log("Data of user: " + JSON.stringify(dataToSend))
                }
            }
            socket.emit('singleImg', dataToSend)
        })
        ///////JUST FOR DEBUGGING/////////
        // console.log("type of data of the query: "+ typeof(req.query.name))
        // console.log("---------------------")
        // console.log("db length: " + readData.imgs.length)
        // console.log("to search: " + req.query.name)
        // console.log("======================")
        // for (var i = 0; i < readData.imgs.length; i++) {
        //     console.log("files: " + readData.imgs[i].file)
        //     console.log("type of file key: "+ typeof(readData.imgs[i].file))
        // }
        // console.log("---------------------")
        //////////////////////////////////
    })
})

//Function to write JSON data to DIY DB
function writeToDb(imgName, totalLines, vertical, horizontal) {
    var d = new Date
    var obj = {
        "file": imgName,
        "date": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "-" + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
        "totalLines": totalLines,
        "vertical": vertical,
        "horizontal": horizontal
    }
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err)
            return
        }
        data = JSON.parse(data)
        data.imgs.push(obj)
        fs.writeFile(file, JSON.stringify(data, null, 4), function(err) {
            if (err) {
                return console.log(err)
            }
            console.log("Files uploaded!")
        })
    })
}

//Function to read JSON data from DIY DB
function readDB(fileName, callback) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err)
        }
        dataRead = JSON.parse(data)
        console.log("DB loaded...")
        //console.log(dataRead)
        callback(dataRead)
    })
}

//Listen on port 3000
app.listen(3000, function() {
    console.log("Server running on port 3000")
})
