import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {projectId, dataset} from './env'
export default defineConfig({
  name: 'default', title: 'Saqib Majeed',
  projectId, dataset,
  plugins: [structureTool({structure})],
  schema: {types: schemaTypes, templates: templates => templates.filter(t => t.schemaType !== 'siteSettings')},
  document: {actions: (actions, context) => context.schemaType === 'siteSettings' ? actions.filter(action => !['duplicate', 'delete', 'unpublish'].includes(action.action || '')) : actions},
})
