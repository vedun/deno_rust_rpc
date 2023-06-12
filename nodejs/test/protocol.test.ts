import test from 'ava';
import { createPacket } from '../src/protocol.js';

test('createPacket', (t) => {
  const inData = new Uint8Array([1, 2, 3, 4]);
  const result = createPacket(inData);
  t.deepEqual(result, new Uint8Array([0, 0, 0, 4, 1, 2, 3, 4]));
});
