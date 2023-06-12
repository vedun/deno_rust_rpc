import test from 'ava';
import { numberFromTuple, numberToTuple } from '../src/number.js';

test('number to tuple', async (t) => {
  t.deepEqual(numberToTuple(255), [0, 0, 0, 255]);
  t.deepEqual(numberToTuple(256), [0, 0, 1, 0]);
  t.deepEqual(numberToTuple(65535), [0, 0, 255, 255]);
  t.deepEqual(numberToTuple(65536), [0, 1, 0, 0]);
  t.deepEqual(numberToTuple(Math.pow(2, 24) - 1), [0, 255, 255, 255]);
  t.deepEqual(numberToTuple(Math.pow(2, 24)), [1, 0, 0, 0]);
});

test('tuple to number', async (t) => {
  t.deepEqual(numberFromTuple([0, 0, 0, 255]), 255);
  t.deepEqual(numberFromTuple([0, 0, 255, 255]), 65535);
  t.deepEqual(numberFromTuple([0, 1, 0, 0]), 65536);
  t.deepEqual(numberFromTuple([0, 255, 255, 255]), Math.pow(2, 24) - 1);
  t.deepEqual(numberFromTuple([1, 0, 0, 0]), Math.pow(2, 24));
});
