import {defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {contentFields} from '../contentFields'
export const project = defineType({
  name: 'project', title: 'Project', type: 'document', icon: DocumentTextIcon,
  fields: contentFields,
  orderings: [{name: 'dateDesc', title: 'Date, Newest', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'thumbnail'}},
})
