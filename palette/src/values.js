const canvas = document.getElementById('canvas');
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
const mouseWrite = false;
const canvasFocus = false;
const color = [];
const pColor = [];
let xBegin;
let yBegin;
canvas.width = '64';
canvas.height = '64';

export { canvas, ctx, tableTools, tableColor, currentColor, prevColor,
  buttonB, buttonC, buttonP, input, inputLabel, list, coordinatsDiv,
  body, widthLine, koeff, mouseWrite, canvasFocus, color, pColor, xBegin, yBegin };
console.log('values');
