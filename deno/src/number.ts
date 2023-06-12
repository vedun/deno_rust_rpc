export function numberToTuple(inData: number): [number, number, number, number] {
  if (inData < 0) throw new Error('input must be positive');
  if (inData > Math.pow(2, 31) - 1) throw new Error('input must be lower 2^31-1');
  const result4 = (inData >> 24) & 0xff;
  const result3 = (inData >> 16) & 0xff;
  const result2 = (inData >> 8) & 0xff;
  const result1 = inData & 0xff;
  return [result4, result3, result2, result1];
}

function checkValue(data: number) {
  if (data < 0 || data > 255) throw new Error('value must be in [0..255] boundaries');
}

export function numberFromTuple(data: [number, number, number, number]): number {
  const data0 = data[0];
  const data1 = data[1];
  const data2 = data[2];
  const data3 = data[3];
  checkValue(data0);
  checkValue(data1);
  checkValue(data2);
  checkValue(data3);
  return (data0 << 24) | (data1 << 16) | (data2 << 8) | data3;
}
