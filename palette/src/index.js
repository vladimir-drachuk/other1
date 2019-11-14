//import pensil from './pensil.js'
import {
  canvas, ctx, tableTools, tableColor, buttonB, buttonC, buttonP, inputLabel,
  input, list, coordinatsDiv, body, widthLine, koeff, mouseWrite, canvasFocus, color,
  pColor, xBegin, yBegin, currentColor, prevColor,
} from './values';

let color1 = color;

const { coordinats } = require('./functionCoordinats.js');
console.log(mouseWrite);
/*const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tableTools = document.querySelector('.table-choose-list');
const tableColor = document.querySelector('.color-choose-list');
const currentColor = document.querySelector('.table__item_rnd_curr');
const prevColor = document.querySelector('.table__item_rnd_prev');
const buttonB = document.querySelector('.paint-bucket');
const buttonC = document.querySelector('.choose-color');
const buttonP = document.querySelector('.pensil');
const input = document.querySelector('.input-color');
const inputLabel = document.querySelector('.label-color');
const list = tableTools.querySelectorAll('.table__item');
const coordinatsDiv = document.querySelector('.coordinats');
const { body } = document;
const widthLine = 1;
const koeff = 8;
let mouseWrite = false;
let canvasFocus = false;
let color = [];
let pColor = [];
let xBegin;
let yBegin;
canvas.width = '64';
canvas.height = '64';*/
function saveCanvas() {
  if (localStorage.getItem('canvas') === null) {
    clearCanvas();
    console.log('1');
    return;
  } 
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  console.log('2');
  
}

function clearCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  localStorage.setItem('canvas', canvas.toDataURL());
}

function inSize(valueX, valueY) {
  if (valueX > +canvas.width || valueX < 0 || valueY > +canvas.height || valueY < 0) return false;
  return true;
}

function goFill(x, y, curColor) {
  const Q = [];
  Q.push([x, y]);
  while (Q.length !== 0) {
    const n = Q[0];
    if (ctx.getImageData(n[0], n[1], 1, 1).data.toString() === curColor && (inSize(n[0], n[1]))) {
      ctx.fillRect(n[0], n[1], 1, 1);
    }
    Q.shift();
    if (ctx.getImageData(n[0] + 1, n[1], 1, 1).data.toString() === curColor
    && (inSize(n[0] + 1, n[1]))) {
      ctx.fillRect(n[0] + 1, n[1], 1, 1);
      Q.push([n[0] + 1, n[1]]);
    }
    if (ctx.getImageData(n[0] - 1, n[1], 1, 1).data.toString() === curColor
    && (inSize(n[0] - 1, n[1]))) {
      ctx.fillRect(n[0] - 1, n[1], 1, 1);
      Q.push([n[0] - 1, n[1]]);
    }
    if (ctx.getImageData(n[0], n[1] + 1, 1, 1).data.toString() === curColor
    && (inSize(n[0], n[1] + 1))) {
      ctx.fillRect(n[0], n[1] + 1, 1, 1);
      Q.push([n[0], n[1] + 1]);
    }
    if (ctx.getImageData(n[0], n[1] - 1, 1, 1).data.toString() === curColor
    && (inSize(n[0], n[1] - 1))) {
      ctx.fillRect(n[0], n[1] - 1, 1, 1);
      Q.push([n[0], n[1] - 1]);
    }
  }
}

function paint(value) {
  if (mouseWrite) {
    const x = Math.floor(value.offsetX / koeff);
    const y = Math.floor(value.offsetY / koeff);
    color = localStorage.getItem('color').split(',');
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    const deltaX = Math.abs(x - xBegin);
    const deltaY = Math.abs(y - yBegin);
    const signX = xBegin < x ? 1 : -1;
    const signY = yBegin < y ? 1 : -1;
    let error = deltaX - deltaY;
    while (xBegin !== x || yBegin !== y) {
      ctx.fillRect(xBegin, yBegin, widthLine, widthLine);
      const error2 = error * 2;
      if (error2 > -deltaY) {
        error -= deltaY;
        xBegin += signX;
      }
      if (error2 < deltaX) {
        error += deltaX;
        yBegin += signY;
      }
    }
  }
}

function drawPoint(value) {
  mouseWrite = true;
  const x = Math.floor(value.offsetX / koeff);
  const y = Math.floor(value.offsetY / koeff);
  ctx.beginPath();
  color = localStorage.getItem('color').split(',');
  ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.fillRect(x, y, widthLine, widthLine);
  xBegin = x;
  yBegin = y;
}

function setColor(value) {
  if (canvasFocus) {
    const x = Math.floor(value.offsetX / koeff);
    const y = Math.floor(value.offsetY / koeff);
    const imageData = ctx.getImageData(x, y, 1, 1);
    if (imageData.data.toString() !== localStorage.getItem('color')) {
      localStorage.setItem('prevColor', localStorage.getItem('color'));
      localStorage.setItem('color', imageData.data);
      color = localStorage.getItem('color').split(',');
      pColor = localStorage.getItem('prevColor').split(',');
      if (color[3] === '0') {
        color.splice(0, 4, '255', '255', '255', '255');
        localStorage.setItem('color', color);
      }
      currentColor.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      prevColor.style.backgroundColor = `rgb(${pColor[0]}, ${pColor[1]}, ${pColor[2]})`;
    }
  }
}

function applyColor() {
  localStorage.setItem('prevColor', localStorage.getItem('color'));
  localStorage.setItem('color', color);
  pColor = localStorage.getItem('prevColor').split(',');
  currentColor.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  prevColor.style.backgroundColor = `rgb(${pColor[0]}, ${pColor[1]}, ${pColor[2]})`;
}

function fillCanvas(event) {
  const x = Math.floor(event.offsetX / koeff);
  const y = Math.floor(event.offsetY / koeff);
  const imageData = ctx.getImageData(x, y, 1, 1);
  color = localStorage.getItem('color').split(',');
  ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
  goFill(x, y, imageData.data.toString());
}

function chooseYourColor() {
  const a = parseInt(input.value[1] + input.value[2], 16);
  const b = parseInt(input.value[3] + input.value[4], 16);
  const c = parseInt(input.value[5] + input.value[6], 16);
  if (localStorage.getItem('color') !== `${a},${b},${c},255`) {
    color[0] = a;
    color[1] = b;
    color[2] = c;
    color[3] = '255';
    applyColor();
    inputLabel.style.backgroundColor = `rgb(${a},${b},${c})`;
  }
}

function paintBucket() {
  body.classList.remove('cursorPensil');
  body.classList.remove('cursorChooseColor');
  body.classList.add('cursorPaintBucket');
  canvas.removeEventListener('mousemove', paint);
  canvas.removeEventListener('mousedown', drawPoint);
  canvas.addEventListener('mousedown', fillCanvas);
}

function chooseColor() {
  body.classList.remove('cursorPensil');
  body.classList.remove('cursorPaintBucket');
  body.classList.add('cursorChooseColor');
  canvas.removeEventListener('mousemove', paint);
  canvas.removeEventListener('mousedown', drawPoint);
  canvas.removeEventListener('mousedown', fillCanvas);
  body.addEventListener('mousedown', setColor);
}

function pensil() {
  ctx.lineWidth = widthLine;
  body.classList.remove('cursorPaintBucket');
  body.classList.remove('cursorChooseColor');
  body.classList.add('cursorPensil');
  canvas.removeEventListener('mousedown', fillCanvas);
  canvas.addEventListener('mousemove', paint);
  canvas.addEventListener('mousedown', drawPoint);
}
console.log(`color${color}`);
function initial() {
  if (localStorage.getItem('color') === null) {
    localStorage.setItem('color', '0,0,0,255');
    localStorage.setItem('prevColor', '255,255,255,0');
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    currentColor.style.backgroundColor = 'rgb(0, 0, 0)';
  } else {
    color = localStorage.getItem('color').split(',');
    pColor = localStorage.getItem('prevColor').split(',');
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    currentColor.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    prevColor.style.backgroundColor = `rgb(${pColor[0]}, ${pColor[1]}, ${pColor[2]})`;
  }
  canvas.addEventListener('mouseout', () => {
    mouseWrite = false;
    canvasFocus = false;
    coordinatsDiv.textContent = 'X / Y';
  });
  canvas.addEventListener('mousemove', (event) => {
    canvasFocus = true;
    coordinatsDiv.textContent = coordinats(event.offsetX, event.offsetY);
  });
  body.addEventListener('mouseup', () => { mouseWrite = false; });
  pensil();
  saveCanvas();
  inputLabel.style.backgroundColor = 'rgb(0, 0, 0)';
  console.log('initial has ever executed');
}

tableTools.addEventListener('click', (event) => {
  const { target } = event;
  const targetLi = target.closest('.table__item');
  if (targetLi.classList.contains('table__item_no-use')) return;
  if (targetLi.classList.contains('clear-canvas')) {
    clearCanvas();
    return;
  }
  for (let i = 0; i < list.length; i += 1) {
    list[i].classList.remove('highlight');
  }
  targetLi.classList.add('highlight');
  if (targetLi.classList.contains('paint-bucket')) paintBucket();
  if (targetLi.classList.contains('choose-color')) chooseColor();
  if (targetLi.classList.contains('pensil')) pensil();
});

tableColor.addEventListener('click', (event) => {
  const { target } = event;
  const targetLi = target.closest('.table__item');
  if (targetLi.classList.contains('table__item_rnd_curr')) return;
  if (targetLi.classList.contains('js-list-input')) { chooseYourColor(); }
  if (targetLi.classList.contains('js-list-prev')) {
    const buffer = localStorage.getItem('prevColor');
    color = buffer.split(',');
    applyColor();
  }
  if (targetLi.classList.contains('js-list-red')) {
    if (color.toString() !== ['255', '0', '0', '255'].toString()) {
      color = ['255', '0', '0', '255'];
      applyColor();
    }
  }
  if (targetLi.classList.contains('js-list-blue')) {
    if (color.toString() !== ['0', '0', '255', '255'].toString()) {
      color = ['0', '0', '255', '255'];
      applyColor();
    }
  }
});

canvas.addEventListener('mouseup', () => {
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyP') {
    buttonB.classList.remove('highlight');
    buttonC.classList.remove('highlight');
    buttonP.classList.add('highlight');
    pensil();
  }
  if (event.code === 'KeyB') {
    buttonP.classList.remove('highlight');
    buttonC.classList.remove('highlight');
    buttonB.classList.add('highlight');
    paintBucket();
  }
  if (event.code === 'KeyC') {
    buttonB.classList.remove('highlight');
    buttonP.classList.remove('highlight');
    buttonC.classList.add('highlight');
    chooseColor();
  }
});
input.addEventListener('change', () => {
  chooseYourColor();
});

initial();
console.log('index');

export default initial;
/*export default pensil;
export default chooseColor;
export default paintBucket;
export default fillCanvas;
export default applyColor;
export default setColor;
export default drawPoint;
export default paint;
export default goFill;
export default inSize;
export default clearCanvas; */
