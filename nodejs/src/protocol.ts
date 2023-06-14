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

export function extractData(packet: Uint8Array): Uint8Array {
  const header = new Uint8Array(packet.buffer, 0, 4);
  const len = numberFromTuple([header[0], header[1], header[2], header[3]]);
  if (len > packet.byteLength) throw new Error('packet length is greater then body');
  const body = new Uint8Array(packet.buffer, 4, len);
  return body;
}
