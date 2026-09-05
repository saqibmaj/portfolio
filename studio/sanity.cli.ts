import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './env'
export default defineCliConfig({
  api: {projectId, dataset},
  vite: {
    define: {
      'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'process.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
    },
  },
})
