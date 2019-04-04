function setup() {
  bg = loadImage('../cloud.png'); // Load the image
  createCanvas(500, 700);
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  // image(img, 0, 0);
  background(bg);
  // Displays the image at point (0, height/2) at half size
  // image(img, 0, height / 2, img.width / 2, img.height / 2);
}
