import { Readable, Writable } from 'node:stream';
import { numberToTuple, numberFromTuple } from './number.js';

export function createPacket(data: Uint8Array): Uint8Array {
  const retValue = new Uint8Array(data.byteLength + 4);
  const length = numberToTuple(data.byteLength);
  retValue[0] = length[0];
  retValue[1] = length[1];
  retValue[2] = length[2];
  retValue[3] = length[3];
  retValue.set(data, 4);
  return retValue;
}

export async function writePacket(stream: Writable, data: Uint8Array): Promise<void> {
  const packetData = createPacket(data);
  const p = new Promise((resolve, reject) => {
    const result = stream.write(packetData);
    if (result === false) {
      stream.once('drain', resolve);
      return;
    }
    return resolve(undefined);
  });
  await p;
}

export async function readPacket(stream: Readable): Promise<Uint8Array> {
  const readBuf = new Uint8Array(2048);
  let currentPos = 0;
  let packetLength = 0;
  for await (const chunk_ of stream) {
    const chunk = chunk_ as Uint8Array;
    readBuf.set(chunk, currentPos);
    currentPos += chunk.byteLength;
    if (currentPos >= 4) {
      packetLength = numberFromTuple([readBuf[0], readBuf[1], readBuf[2], readBuf[3]]);
    }
  }
  throw new Error('!!!!!!!!!!!!!!');
}
