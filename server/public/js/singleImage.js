function init() {
    var socket = io.connect('http://fii.to:3300')
    var image = document.getElementById("image")
    socket.on('singleImg', function(data) {
        console.log("Route -> image --> Data is of type: " + typeof(data))
        console.log(data.file)
        image.innerHTML = ""
        var elemLinkRaw = document.createElement("a")
        elemLinkRaw.href = "http://fii.to/apps/aesthetic_measure/server/imgs/raw-" + data.file + ".jpg"
        elemLinkRaw.setAttribute('target', '_blank')
        var elemLinkCv = document.createElement("a")
        elemLinkCv.href = "http://fii.to/apps/aesthetic_measure/server/imgs/cv-" + data.file + ".jpg"
        elemLinkCv.setAttribute('target', '_blank')
        var elemImgRaw = document.createElement("img")
        var elemImgCv = document.createElement("img")
        var qrImg = document.createElement("img")
        var parFileName = document.createElement("p")
        var total = document.createElement("p")
        var vert = document.createElement("p")
        var hor = document.createElement("p")
        var aestheticMeasure = document.createElement("p")
        var price = document.createElement("p")
        var date = document.createElement("p")
        var qrImg = document.createElement("img")
        var d = new Date
        date.innerHTML = data.file
        parFileName.innerHTML = data.date
        aestheticMeasure.innerHTML = "<b>aesthetic-measure:</b> 123.4"
        total.innerHTML = "<b>total lines:</b> " + data.totalLines
        vert.innerHTML = "<b>vertical lines:</b> " + data.vertical
        hor.innerHTML = "<b>horizontal lines:</b> " + data.horizontal
        price.innerHTML = "<b>price:</b> USD$ 25.99"
        elemImgRaw.src = 'http://fii.to/apps/aesthetic_measure/server/imgs/raw-' + String(data.file) + '.jpg'
        elemImgCv.src = 'http://fii.to/apps/aesthetic_measure/server/imgs/cv-' + String(data.file) + '.jpg'
        qrImg.src = 'http://fii.to/apps/aesthetic_measure/server/imgs/qr-' + String(data.file) + '.png'
        image.style.display = "inline-block"
        image.style.padding = "10px"
        image.style.marginRight = "10px"
        image.style.marginTop = "10px"
        image.style.maxWidth = "270px"
        image.style.border = "1px solid black"
        parFileName.style.wordWrap = "break-word"
        image.style.textAlign = "center"
        image.appendChild(elemLinkRaw)
        image.appendChild(elemLinkCv)
        elemLinkRaw.appendChild(elemImgRaw)
        elemLinkCv.appendChild(elemImgCv)
        image.appendChild(parFileName)
        image.appendChild(aestheticMeasure)
        image.appendChild(total)
        image.appendChild(vert)
        image.appendChild(hor)
        image.appendChild(price)
        image.appendChild(date)
        image.appendChild(qrImg)

    })
}
