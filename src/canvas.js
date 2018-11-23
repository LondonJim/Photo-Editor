class Canvas {

  constructor() {
    this.image = document.getElementById('SourceImage')
    this.canvas = document.getElementById('Canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 1
    this.canvas.height = 1

    this.resetValues()
    this.events()
  }

  resetValues() {
    document.getElementById('brightness').value = 0
    document.getElementById('contrast').value = 0
    this.brightnessValue = 0
    this.contrastValue = 0
    this.isInverted = false
  }

  drawImageToCanvas() {
    var width = this.image.naturalWidth
    var height = this.image.naturalHeight
    this.canvas.width = width
    this.canvas.height = height
    this.context.drawImage(this.image, 0, 0)
  }

  onFileSelected(event) {
    this.resetValues()
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
    if (this.isInverted) {
      var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      for (var i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i] = imageData.data[i] ^ 255
        imageData.data[i+1] = imageData.data[i+1] ^ 255
        imageData.data[i+2] = imageData.data[i+2] ^ 255
      }
      this.context.putImageData(imageData, 0, 0)
    }
  }

  brightness(value) {
    var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    for (var i = 0; i < imageData.data.length; i+=4) {
      imageData.data[i] += 255 * (value / 100)
      imageData.data[i+1] += 255 * (value / 100)
      imageData.data[i+2] += 255 * (value / 100)
    }
    this.context.putImageData(imageData, 0, 0)
  }

  contrast(value) {
    var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    value = (value/100) + 1
    var intercept = 255*(-value/2 + 0.5)
    for(var i=0;i<imageData.data.length;i+=4){
      imageData.data[i] = imageData.data[i]*value + intercept;
      imageData.data[i+1] = imageData.data[i+1]*value + intercept;
      imageData.data[i+2] = imageData.data[i+2]*value + intercept;
    }
    this.context.putImageData(imageData, 0, 0)
  }

  events() {
    document.getElementById('reset').addEventListener("click", function() {
      this.resetValues()
      this.filters()
    }.bind(this))
    document.getElementById('invert').addEventListener("click", function() {
      this.isInverted ? this.isInverted = false : this.isInverted = true
      this.filters()
    }.bind(this))
    document.getElementById('brightness').addEventListener("click", function() {
      this.brightnessValue = document.getElementById('brightness').value
      this.filters()
    }.bind(this))
    document.getElementById('contrast').addEventListener("click", function() {
      this.contrastValue = document.getElementById('contrast').value
      this.filters()
    }.bind(this))
  }

  filters() {
    this.context.drawImage(this.image, 0, 0)
    this.invertImage()
    this.contrast(this.contrastValue)
    this.brightness(this.brightnessValue)
  }
}
