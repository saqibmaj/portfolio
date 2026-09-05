import {existsSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {loadEnvFile} from 'node:process'
const envPath = fileURLToPath(new URL('../.env', import.meta.url))
if (existsSync(envPath)) loadEnvFile(envPath)
export const projectId = process.env.PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.PUBLIC_SANITY_DATASET!
if (!projectId || !dataset) throw new Error('Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in the root .env')
