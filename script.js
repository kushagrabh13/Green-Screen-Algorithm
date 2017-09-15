var fgimage = null;
var bgimage = null;
var fgcanvas = document.getElementById("c1");
var bgcanvas = document.getElementById("c2"); 

function uploadfgimage(){
 var fileinp = document.getElementById("fginp");
 fgimage = new SimpleImage(fileinp);
 fgimage.drawTo(fgcanvas);
}

function uploadbgimage(){
 var fileinp = document.getElementById("bginp");
 bgimage = new SimpleImage(fileinp);
 bgimage.drawTo(bgcanvas);
}

function checkSizes() {
  var fgImageSize = fgimage.getWidth() * fgimage.getHeight();
  var bgImageSize = bgimage.getWidth() * bgimage.getHeight();
  if (fgImageSize != bgImageSize) {
    alert('Images differ in size, Please upload similar sizes');
    return false;
  }
  return true;
}
function createComposite() {
    // Create blank image with dimensions of fgImage
  var composite = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    // If green value exceeds threshold, grab background pixel
    var greenThreshold = pixel.getRed()+pixel.getBlue();
    if (pixel.getGreen() > greenThreshold) {
      var bgPixel = bgimage.getPixel(x, y);
      composite.setPixel(x, y, bgPixel);
    } else {
      // Otherwise, grab foreground pixel
      composite.setPixel(x, y, pixel);
    }
  }
  return composite;
}

function doGreenScreen() {
  if (fgimage == null || !fgimage.complete()) {
    alert("Foreground image has not been loaded");
  }
  if (bgimage == null || !bgimage.complete()) {
    alert("Background image has not been loaded");
  } 
  checkSizes();
  clearCanvas();
  var output = createComposite();
  output.drawTo(fgcanvas);
}

function clearCanvas() {
  doClear(fgcanvas);
  doClear(bgcanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}