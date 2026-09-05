import {createClient} from '@sanity/client'
export const DEFAULT_AUTHOR = 'Saqib Majeed'
export type ContentType = 'project' | 'article'
export type ContentItem = {
  _id: string; type: ContentType; title: string; slug: string; summary: string;
  date: string; href: string; content: string; readTime?: number;
  imageUrl?: string;
}
export type SocialLink = {platform: 'linkedin' | 'resume'; url: string}
export type SiteSettings = {
  tagline: string; socialLinks: SocialLink[];
  avatarUrl?: string;
}
export const sanity = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-08-01',
  useCdn: false, perspective: 'published',
})
type ContentDocument = Omit<ContentItem, 'type' | 'href' | 'readTime'> & {_type: ContentType}
const fields = `_id, _type, title, "slug": slug.current, summary, date, content,
  "imageUrl": thumbnail.asset->url`
function mapContent(doc: ContentDocument): ContentItem {
  const content = doc.content || ''
  return {...doc, type: doc._type, content, summary: doc.summary || '',
    href: `/${doc._type === 'project' ? 'projects' : 'articles'}/${doc.slug}`,
    readTime: doc._type === 'article' ? Math.max(1, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 200)) : undefined,
    imageUrl: doc.imageUrl ? `${doc.imageUrl}?w=960&h=540&fit=crop&auto=format` : undefined,
  }
}
let contentCache: Promise<ContentItem[]> | undefined
export function getAllContent(): Promise<ContentItem[]> {
  return contentCache ??= sanity.fetch<ContentDocument[]>(
    `*[_type in ["project", "article"] && defined(slug.current)] | order(date desc, title asc) {${fields}}`
  ).then(docs => docs.map(mapContent))
}
export async function getContent(type: ContentType) {
  return (await getAllContent()).filter(item => item.type === type)
}
let settingsCache: Promise<SiteSettings> | undefined
export function getSiteSettings(): Promise<SiteSettings> {
  return settingsCache ??= sanity.fetch(`*[_id == "siteSettings"][0]{
    tagline, linkedinUrl, "resumeUrl": resume.asset->url, "avatarUrl": avatar.asset->url
  }`).then(doc => ({
    tagline: doc?.tagline || 'A selection of my projects, ideas, and writing.',
    socialLinks: [
      ...(doc?.linkedinUrl ? [{platform: 'linkedin' as const, url: doc.linkedinUrl}] : []),
      ...(doc?.resumeUrl ? [{platform: 'resume' as const, url: doc.resumeUrl}] : []),
    ],
    avatarUrl: doc?.avatarUrl ? `${doc.avatarUrl}?w=64&h=64&fit=crop&auto=format` : undefined,
  }))
}
