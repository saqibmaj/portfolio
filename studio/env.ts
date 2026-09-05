// Vite replaces these two public values at build time and removes this Node-only
// fallback. CLI/schema workers load the shared file themselves in Node.
if (!process.env.PUBLIC_SANITY_PROJECT_ID || !process.env.PUBLIC_SANITY_DATASET) {
  const {existsSync} = require('node:fs')
  const {resolve} = require('node:path')
  const {loadEnvFile} = require('node:process')
  const envPath = resolve(__dirname, '../.env')
  if (existsSync(envPath)) loadEnvFile(envPath)
}
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET
if (!projectId || !dataset) throw new Error('Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in the root .env')
if (!/^[a-z0-9-]+$/.test(projectId)) throw new Error('PUBLIC_SANITY_PROJECT_ID must contain only lowercase letters, numbers, and hyphens')
if (!/^(~[a-z0-9][-\w]{0,63}|[a-z0-9][-\w]{0,63})$/.test(dataset)) throw new Error('PUBLIC_SANITY_DATASET must be a valid Sanity dataset name')

// Export after validation so consumers receive strings, never undefined.
const validatedProjectId: string = projectId
const validatedDataset: string = dataset
export {validatedProjectId as projectId, validatedDataset as dataset}
