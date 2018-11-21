class Canvas {

  constructor() {
    this.image = document.getElementById('SourceImage')
    this.canvas = document.getElementById('Canvas')
    this.context = this.canvas.getContext('2d')
  }

  drawImage() {
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
        this.drawImage()
      }.bind(this), 1)
    }.bind(this)

    reader.readAsDataURL(selectedFile)
  }
}
