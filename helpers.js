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
  if (lbl.length) {
    context.fillStyle = col;
    context.font = "20px Verdana";
    context.fillText(lbl[0], rX(x) + 20, rY(y));
    if (lbl.length > 1) {
      context.font = "15px Verdana";
      context.fillText(lbl[1], rX(x) + (lbl[0] == "P" ? 30 : 35), rY(y) + 5);
    }
  }
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

var drawBBox = (points, col) => {
  if (points.length == 0) return;
  var minX = points[0].x;
  var maxX = points[0].x;
  var minY = points[0].y;
  var maxY = points[0].y;
  points.forEach((p) => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });
  context.strokeStyle = col;
  context.beginPath();
  context.rect(rX(minX), rY(minY), rX(maxX) - rX(minX), rY(maxY) - rY(minY));
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
