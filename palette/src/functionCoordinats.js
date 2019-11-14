function coordinats(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(x) || Number.isNaN(y)) throw new TypeError('insert correct values.');
  const X = Math.floor(x / 8);
  const Y = Math.floor(y / 8);
  const str = `X = ${X} / Y = ${Y}`;
  return str;
}

module.exports = {
  coordinats,
};
