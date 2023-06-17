import * as utils from 'node:util';
import * as path from 'node:path';
import { createServer } from 'node:http';
import { hello } from 'addon';
import { Rpc } from './rpc.js';

const binaryPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '..',
  '..',
  '..',
  '..',
  'cpp',
  'build',
  'rpc_service',
);

const rpc = new Rpc(binaryPath);

const srv = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // rpc
  //   .request({ proc: 'test' })
  //   .then((val) => {
  //     res.end(JSON.stringify(val));
  //     return;
  //   })
  //   .catch((e) => {
  //     res.end(`{"error": "${utils.inspect(e)}"}`);
  //   });
  res.end(JSON.stringify(hello()));
});
srv.listen({ port: 8000 });
