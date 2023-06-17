import { availableParallelism } from 'node:os';
import { createServer } from 'node:http';
import cluster from 'node:cluster';
import { hello } from 'addon';

// const data = JSON.stringify({ name: 'user', age: 12 });

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    const pid = worker.process.pid ?? 'undefinde';
    console.log(`worker ${pid} exited`);
  });
} else {
  const srv = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(hello()));
  });
  srv.listen({ port: 8000 });
  console.log(`Worker ${process.pid} started`);
}
