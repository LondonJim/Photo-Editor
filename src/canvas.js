class Canvas {

  constructor() {
    this.image = document.getElementById('SourceImage')
    this.canvas = document.getElementById('Canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 1
    this.canvas.height = 1
  }

  drawImageToCanvas() {
    var width = this.image.naturalWidth
    var height = this.image.naturalHeight
    this.canvas.width = width
    this.canvas.height = height
    this.context.drawImage(this.image, 0, 0)
  }

  onFileSelected(event) {
    var selectedFile = event.files[0]
    var reader = new FileReader()

    this.image.title = selectedFile.name

    reader.onload = function(event) {
      this.image.src = event.target.result
      setTimeout(function(){
        this.drawImageToCanvas()
      }.bind(this), 1)
    }.bind(this)

    reader.readAsDataURL(selectedFile)
  }

  invertImage() {
    var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    for (var i = 0; i < imageData.data.length; i+=4) {
      imageData.data[i] = imageData.data[i] ^ 255
      imageData.data[i+1] = imageData.data[i+1] ^ 255
      imageData.data[i+2] = imageData.data[i+2] ^ 255
    }
    this.context.putImageData(imageData, 0, 0)
  }
}
