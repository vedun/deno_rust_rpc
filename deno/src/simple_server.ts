import * as http from "https://deno.land/std@0.191.0/http/server.ts";
import * as path from "https://deno.land/std@0.191.0/path/mod.ts";
import { decode } from "https://esm.sh/@msgpack/msgpack@2.8.0/mod.ts";

const currentDirName = path.dirname(new URL(import.meta.url).pathname);

const binPath = path.join(
  currentDirName,
  "..",
  "..",
  "rust",
  "target",
  "release",
  "simple_rpc"
);

const child = new Deno.Command(binPath, {
  stdin: "piped",
  stdout: "piped",
}).spawn();

const writer = child.stdin.getWriter();
const reader = child.stdout.getReader({ mode: "byob" });

function getBuf() {
  const buf = new ArrayBuffer(10);
  return new Uint8Array(buf);
}

// const n = 8;
// const values = new Array<number>(n);
// values.fill(0);
// let i = 0;

async function handler(req: Request): Promise<Response> {
  const data = { name: "1111111", age: 23 };
  // const start = performance.now();
  await writer.write(new Uint8Array([0, 0, 0, 1, 128]));
  const buf = getBuf();
  await reader.read(buf);
  decode(new Uint8Array([128]));
  // const stop = performance.now();
  // values[i] = stop - start;
  // i++;
  // i = i % n;
  // const average =
  //   values.reduce((prev, current) => prev + current, 0) / values.length;
  // console.log(`latency: ${average}`);
  return Response.json(data);
}

try {
  await http.serve(handler);
} catch (e: unknown) {
  console.error(e);
}

// const rpc = new Rpc(
//   "/home/mks/projects/isone2/src/node_rpc_rust/rust/target/release/simple_rpc"
// );

// const srv = createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   rpc
//     .request()
//     .then((val) => {
//       const result = decode(val);
//       res.end(JSON.stringify(result));
//       return;
//     })
//     .catch((e) => {
//       res.end(`{"error": "${utils.inspect(e)}"}`);
//     });
// });

// srv.listen({ port: 8000, exclusive: false });
