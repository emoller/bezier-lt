const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var rX = (x) =>
  canvas.width / 2 +
  Math.min(canvas.width, canvas.height) * (-0.5 + 0.05 + x * 0.75);
var rY = (y) =>
  canvas.height / 2 +
  Math.min(canvas.width, canvas.height) * (-0.5 + 0.05 + y * 0.75);
var lerp = (a, b, t) => (1 - t) * a + t * b;

var drawPoint = (x, y, col, lbl) => {
  context.strokeStyle = col;
  context.beginPath();
  context.arc(rX(x), rY(y), 10, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = col;
  context.font = "20px Verdana";
  context.fillText(lbl, rX(x) + 20, rY(y));
};

var drawLine = (x0, y0, x1, y1, c0, c1) => {
  if (c0 == c1) {
    context.strokeStyle = c0;
  } else {
    var grad = context.createLinearGradient(rX(x0), rY(y0), rX(x1), rY(y1));
    grad.addColorStop(0, c0);
    grad.addColorStop(1, c1);
    context.strokeStyle = grad;
  }
  context.beginPath();
  context.moveTo(rX(x0), rY(y0));
  context.lineTo(rX(x1), rY(y1));
  context.stroke();
};

var slider = document.getElementById("tvalue");
var output = document.getElementById("sliderlabel");

if (slider) {
  var sliderchange = () => {
    var t = slider.value / slider.max;
    output.innerHTML = "t=" + t;
    slider.style.backgroundSize = 100 * t + "% 100%";
    drawCanvas(t);
  };

  slider.oninput = sliderchange;
  sliderchange();
}
if (canvas) {
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCanvas();
  };
  resize();
  window.addEventListener("resize", resize);
}
