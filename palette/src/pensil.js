import { ctx, widthLine, body, canvas, fillCanvas, drawPoint } from './index'

console.log('pensil');
function pensil() {
    ctx.lineWidth = widthLine;
    body.classList.remove('cursorPaintBucket');
    body.classList.remove('cursorChooseColor');
    body.classList.add('cursorPensil');
    canvas.removeEventListener('mousedown', fillCanvas);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mousedown', drawPoint);
    console.log('function pensil has executed');
  }

export default pensil;