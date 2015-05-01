function init() {
    var socket = io.connect('http://fii.to:3300')
    var images = document.getElementById("images")
    socket.on('img', function(data) {
    	images.innerHTML = ""
        console.log("Route -> aesthetic_measure --> Data is of type: " + typeof(data))
        console.log("The data now is: " + JSON.stringify(data))
        for (var i = 0; i < data.imgs.length; i++) {
            var elemLink = document.createElement("a")
            elemLink.href = "http://fii.to:3000/image?name=" + data.imgs[i].file
            elemLink.setAttribute('target', '_blank')
            var elemImg = document.createElement("img")
            var parFileName = document.createElement("p")
            var total = document.createElement("p")
            var vert = document.createElement("p")
            var hor = document.createElement("p")
            var aestheticMeasure = document.createElement("p")
            var price = document.createElement("p")
            var date = document.createElement("p")
            var d = new Date
            date.innerHTML = data.imgs[i].file
            parFileName.innerHTML = data.imgs[i].date
            aestheticMeasure.innerHTML = "<b>aesthetic-measure:</b> 123.4"
            total.innerHTML = "<b>total lines:</b> " + data.imgs[i].totalLines
            vert.innerHTML = "<b>vertical lines:</b> " + data.imgs[i].vertical
            hor.innerHTML = "<b>horizontal lines:</b> " + data.imgs[i].horizontal
            price.innerHTML = "<b>price:</b> USD$ 25.99"
            var elemDiv = document.createElement("div")
            elemImg.src = 'http://fii.to/apps/aesthetic_measure/server/imgs/raw-' + String(data.imgs[i].file) + '.jpg'
            elemDiv.style.display = "inline-block"
            elemDiv.style.padding = "10px"
            elemDiv.style.marginRight = "10px"
            elemDiv.style.marginTop = "10px"
            elemDiv.style.maxWidth = "270px"
            elemDiv.style.border = "1px solid black"
            parFileName.style.wordWrap = "break-word"
            elemDiv.style.textAlign = "center"
            elemLink.appendChild(elemImg)
            elemDiv.appendChild(elemLink)
            elemDiv.appendChild(parFileName) 
            elemDiv.appendChild(aestheticMeasure)
            elemDiv.appendChild(total)
            elemDiv.appendChild(vert)
            elemDiv.appendChild(hor)
            elemDiv.appendChild(price)
            elemDiv.appendChild(date)
            images.appendChild(elemDiv)
        }
    })
}