import { setTimeout } from "node:timers/promises";

const binPath =
  "/home/mks/projects/isone2/src/node_rpc_rust/rust/target/debug/simple_rpc";

const child = new Deno.Command(binPath, {
  stdin: "piped",
  stdout: "piped",
}).spawn();

const writer = child.stdin.getWriter();
const reader = child.stdout.getReader({ mode: "byob" });

while (true) {
  await writer.write(new Uint8Array([0, 0, 0, 1, 128]));
  const buf = getBuf();
  const result = await reader.read(buf);
  console.log("---- deno reading ----");
  console.log(buf);
  console.log(result);
  await setTimeout(200);
}

function getBuf() {
  const buf = new ArrayBuffer(10);
  return new Uint8Array(buf);
}

// await sleep(4000);
// for await (const data of reader) {
//   console.log(data);
// }

// const reader = child.stdout.getReader({ mode: "byob" });
// const buf = new ArrayBuffer(4);
// const header = new Uint8Array(buf);
// while (true) {
//   const data = await reader.read(header);
//   console.log(data);
// }
