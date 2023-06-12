import { spawn, ChildProcess } from 'node:child_process';
import { Writable, Readable } from 'node:stream';
import { writePacket, readPacket } from './protocol.js';

export class Rpc {
  private child: ChildProcess;
  private childStdin: Writable;
  private childStdout: Readable;

  constructor(binPath: string) {
    this.child = spawn(binPath);
    if (!this.child.stdin) {
      this.child.kill();
      throw new Error('stdin not present');
    }
    if (!this.child.stdout) {
      this.child.kill();
      throw new Error('stdout not present');
    }
    this.childStdin = this.child.stdin;
    this.childStdout = this.child.stdout;
  }

  async request(): Promise<Uint8Array> {
    // const emptyObject = new Uint8Array([0, 0, 0, 1, 128]); // {}
    // const requestPromise = new Promise((resolve, reject) => {
    //   const result = this.childStdin.write(emptyObject);
    //   if (result === false) {
    //     this.childStdin.once('drain', resolve);
    //     return;
    //   }
    //   return resolve(undefined);
    // });
    // await requestPromise;
    await writePacket(this.childStdin, new Uint8Array([128])); // empty object {}
    const result = await readPacket(this.childStdout);
    // const responcePromise = new Promise<Uint8Array>((resolve, reject) => {
    //   this.childStdout.read();
    // });
    // const data = await responcePromise;
    // return new Uint8Array([128]);
    return result;
  }

  async stop() {
    const p = new Promise((resolve, reject) => {
      this.child.once('close', resolve);
      this.child.kill('SIGTERM');
    });
    await p;
  }
}
