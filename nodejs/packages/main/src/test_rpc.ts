import * as path from 'node:path';
import { Rpc } from './rpc.js';

const binaryPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '..',
  '..',
  'cpp',
  'build',
  'rpc_service',
);

const service = new Rpc(binaryPath);
const response = await service.request({ proc: 'test' });
console.log('response:');
console.dir(response);
await service.stop();
