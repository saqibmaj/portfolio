import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'
export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document', icon: CogIcon,
  fields: [
    defineField({name: 'tagline', type: 'string', initialValue: 'A selection of my projects, ideas, and writing.', validation: rule => rule.required()}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', validation: rule => rule.required().uri({scheme: ['https']}).custom(value => !value || /^https:\/\/(www\.)?linkedin\.com\//.test(value) || 'Enter a LinkedIn profile URL.')}),
    defineField({name: 'resume', title: 'Resume', type: 'file', options: {accept: 'application/pdf'}, validation: rule => rule.required()}),
    defineField({name: 'avatar', title: 'Avatar', type: 'image', description: 'A square portrait shown beside Saqib Majeed. Displayed as a small circle.'}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
