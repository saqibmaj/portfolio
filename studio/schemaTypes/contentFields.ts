import {defineField} from 'sanity'
export const contentFields = [
  defineField({name: 'title', type: 'string', validation: rule => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: rule => rule.required().custom(value => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || 'Use lowercase letters, numbers, and hyphens.')}),
  defineField({name: 'summary', type: 'text', rows: 3, validation: rule => rule.required()}),
  defineField({name: 'thumbnail', type: 'image', options: {hotspot: true}, description: '16:9 image for listings and detail pages.'}),
  defineField({name: 'date', type: 'date', validation: rule => rule.required()}),
  defineField({name: 'content', type: 'text', rows: 20, description: 'Markdown, including headings and footnotes.', validation: rule => rule.required()}),
]
