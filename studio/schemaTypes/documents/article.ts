import {defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {contentFields} from '../contentFields'
export const article = defineType({
  name: 'article', title: 'Article', type: 'document', icon: DocumentTextIcon,
  fields: [...contentFields, ],
  orderings: [{name: 'dateDesc', title: 'Date, Newest', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'thumbnail'}},
})
