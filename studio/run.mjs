import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const result = spawnSync(process.execPath, ['node_modules/sanity/bin/sanity', ...process.argv.slice(2)], {cwd: fileURLToPath(new URL('.', import.meta.url)), stdio: 'inherit', env: process.env});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
