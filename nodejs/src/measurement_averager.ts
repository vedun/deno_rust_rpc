export class Avg {
  private n: number;
  private i: number;
  private arr: number[];

  constructor(n: number) {
    this.n = n;
    this.arr = new Array<number>(n);
    this.i = 0;
    for (let i = 0; i < this.arr.length; i++) this.arr[i] = 0;
  }

  add(val: number) {
    this.arr[this.i] = val;
    this.i = (this.i + 1) % this.n;
  }

  avg() {
    return this.arr.reduce((prev, curr) => prev + curr, 0) / this.n;
  }
}
