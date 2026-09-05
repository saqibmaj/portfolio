import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons'
export const structure: StructureResolver = S => S.list().title('Portfolio').items([
  S.documentTypeListItem('project').title('Projects'),
  S.documentTypeListItem('article').title('Articles'),
  S.divider(),
  S.listItem().title('Site Settings').id('siteSettings').icon(CogIcon).child(S.document().schemaType('siteSettings').documentId('siteSettings')),
])
