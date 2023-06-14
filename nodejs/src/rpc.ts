import { spawn, ChildProcess } from 'node:child_process';
import { Writable, Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';
import { encode, decode } from '@msgpack/msgpack';
import { createPacket, extractData } from './protocol.js';
import { Avg } from './measurement_averager.js';

export type Request = {
  proc: 'test';
};

export type Response = ErrorResponse | SuccessResponse<string>;

export type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

export type ErrorResponse = {
  status: 'error';
  error: string;
};

export class Rpc {
  private child: ChildProcess;
  private childStdin: WritableStream<Uint8Array>;
  private childStdout: ReadableStream<Uint8Array>;
  private avg = new Avg(20);

  constructor(binPath: string) {
    this.child = spawn(binPath, { stdio: ['pipe', 'pipe', 'inherit'] });
    if (!this.child.stdin) {
      this.child.kill('SIGKILL');
      throw new Error('stdin not present');
    }
    if (!this.child.stdout) {
      this.child.kill('SIGKILL');
      throw new Error('stdout not present');
    }
    // if (!this.child.stderr) {
    //   this.child.kill('SIGKILL');
    //   throw new Error('stderr not present');
    // }

    this.childStdin = Writable.toWeb(this.child.stdin);
    this.childStdout = Readable.toWeb(this.child.stdout) as ReadableStream<Uint8Array>; // FIXME: !!!!!!!!!!

    // setTimeout(() => {
    //   console.log(`time: ${this.avg.avg()}`);
    // }, 12000);
  }

  async request(request: Request): Promise<Response> {
    // const start = Number(process.hrtime.bigint());

    const encData = encode(request);
    const packet = createPacket(encData);
    const writer = this.childStdin.getWriter();
    await writer.write(packet);
    writer.releaseLock();

    const reader = this.childStdout.getReader();
    const readResult = await reader.read();
    reader.releaseLock();

    if (readResult.done === false) {
      const decodedVal = decode(extractData(readResult.value)) as Response;
      // const stop = Number(process.hrtime.bigint());
      // this.avg.add((stop - start) / 1000_000);
      return decodedVal;
    } else throw new Error('Child process close stdout');
  }

  async stop() {
    const p = new Promise((resolve, reject) => {
      this.child.once('close', resolve);
      this.child.kill('SIGTERM');
    });
    await p;
  }
}
