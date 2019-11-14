/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { coordinats } = require('./palette/src/functionCoordinats.js');

describe('right coordinats', () => {
  it('coordinats (8,7)', () => {
    const X = 8;
    const Y = 7;
    const result = 'X = 1 / Y = 0';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (3,14)', () => {
    const X = 3;
    const Y = 14;
    const result = 'X = 0 / Y = 1';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (512,512)', () => {
    const X = 512;
    const Y = 512;
    const result = 'X = 64 / Y = 64';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (111,214)', () => {
    const X = 111;
    const Y = 214;
    const result = 'X = 13 / Y = 26';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (300,200)', () => {
    const X = 300;
    const Y = 200;
    const result = 'X = 37 / Y = 25';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (300,201)', () => {
    const X = 300;
    const Y = 201;
    const result = 'X = 37 / Y = 25';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (300,202)', () => {
    const X = 300;
    const Y = 202;
    const result = 'X = 37 / Y = 25';
    expect(coordinats(X, Y)).to.equal(result);
  });

  it('coordinats (301,200)', () => {
    const X = 301;
    const Y = 200;
    const result = 'X = 37 / Y = 25';
    expect(coordinats(X, Y)).to.equal(result);
  });
});

describe('expect to throw TypeError', () => {
  it('insert strings', () => {
    const X = 'Hello';
    const Y = 'World';
    expect(() => coordinats(X, Y)).to.throw('insert correct values.');
  });

  it('insert arrays', () => {
    const X = [1, 1];
    const Y = [2, 2];
    expect(() => coordinats(X, Y)).to.throw('insert correct values.');
  });

  it('insert booleans', () => {
    const X = true;
    const Y = false;
    expect(() => coordinats(X, Y)).to.throw('insert correct values.');
  });

  it('insert NaN', () => {
    const X = 100;
    const Y = NaN;
    expect(() => coordinats(X, Y)).to.throw('insert correct values.');
  });
});
