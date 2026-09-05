import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './env'
export default defineCliConfig({api: {projectId, dataset}})
