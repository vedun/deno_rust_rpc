import * as utils from 'node:util';
import { createServer } from 'node:http';
import { encode, decode } from '@msgpack/msgpack';
import { Rpc } from './rpc.js';

// const data = JSON.stringify({ name: 'user', age: 12 });

const rpc = new Rpc('/home/mks/projects/isone2/src/node_rpc_rust/rust/target/release/simple_rpc');

const srv = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  rpc
    .request()
    .then((val) => {
      const result = decode(val);
      res.end(JSON.stringify(result));
      return;
    })
    .catch((e) => {
      res.end(`{"error": "${utils.inspect(e)}"}`);
    });
});

srv.listen({ port: 8000, exclusive: false });
