import { categoryArticlePool } from './categoryData'
import { heroStory, latestArticles, topStories } from './newsData'

export function toArticleSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const defaultArticle = {
  category: 'Climate',
  title: 'Hidden Gems: The Coastal Villages Untouched by Tourism',
  author: 'Sarah Jenkins',
  role: 'Senior Environmental Correspondent',
  publishedAt: 'Oct 24, 2023',
  weather: '72 F',
  heroImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCa9K0b18AUg7r0DvUA7UI7h1dbAc2REppb09oE7Rv1rwOzWhOugufsn1U9OKpLgTasVnA6XsxhvojfZQ1BG1XnmSABAiqf0xgBY-Hu0tNZRL2bKO_K6BV0SxPPdZgGSl7jFEU5oZEe0qfrfdVjlzO8leuBZhDveCOCTFUZ0bFHbjK1mEyiBtD1k4cMpGY6R9kytAqNP_uqOQMr7HNcBdayqNeUDuxkuqB17y7wgfyG2ye5z05X5okFMejt_9y21KtGBz6WoI1y844',
  heroAlt: 'Serene coastal village with white houses by blue sea',
  imageCredit: 'Photo by Julian Abrams / The Daily Observer',
  intro:
    'Far from the bustling crowds of the Mediterranean\'s most famous resorts, a string of coastal villages remains anchored in a different century. These are places where the rhythm of life is still dictated by the tide and local catch.',
  paragraphs: [
    'Travelers often speak of discovering a place, but these villages do not feel lost. They feel preserved, offering a rare glimpse into a way of life that is increasingly difficult to find.',
    'The challenges are significant. As younger generations move toward urban centers for work, the delicate balance between heritage and sustainable development becomes the central question.',
    'Environmental conservation groups are now working with local communities to ensure growth remains light-touch and protects what makes these places unique.',
  ],
  quote:
    'In these quiet corners, the luxury is not in amenities, but in the silence of an afternoon undisturbed by modern life.',
  gallery: [
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZWINXAjdBVDBSVhCxeJwapeP8rGG1XJhuHcZQVV5jJe4C79aYgv-jTDz12OzDtazCazVGIVOuohJ8IQd_BmTFQ3bOh4Lr4LEVQwcpCYvurWZEYxFpsgRC8QIrBV0Z7sYv4g1mRQ0A_Ma8YE7-jdwhHP3MGabNDTjuzszkbyt2qwe3dn3hiOLMjBaFWXGeOLKFzL67HTqEDSdM4X1z9O6go_UtCIGZ_1AI9nIGPh4QYB__SPNff1nRc9oxUuWgUghOvHCLYm0ouk',
      alt: 'Narrow stone alley in an old coastal village',
    },
    {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuClzDfdAruYrI4EAHlUTlyn2KlIGGi5DcuzTSYvx-aU0Zl9AuSbLuGLUILM7yfN4ay0ZO__BfQJHXqunWIuwCIojUF-_IxBaYONKJJhKO7wu2bU5qvjJHX9ivh-0rGU2e2AridHbRy5DOBTB0XW97vnFo_ZwLbag_I7Wlunl39lTYLLtllusyRrz9L4AXKkq3-q8tUUudrlJ4OFja-F__zmv2b0us-rIMGfjWkLKbDrJohr1fKYuRqcdHICsIusTFZM31AKj2BcVdA',
      alt: 'Small wooden fishing boat on calm turquoise water',
    },
  ],
  tags: ['Sustainable Travel', 'Europe', 'Hidden Gems'],
  relatedStories: [
    {
      title: 'The Vanishing Glaciers of the Swiss Alps',
      meta: 'Environment | 6 min read',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKbzXP6rf2DGMdfwBicFIkB090-N0vWlQQDSJ51PRaeMe8e2k1018dDLfb-zOxfrE3DyZCS9otu-k_4yMXKvl7GlG8Gi7avNoUqrjlKOasmwnejvNNubdSgrnDOv_Sr6PxdXEYBHjiw0khNLhVi3wKOT_q8fhNe7Pu_f_r_qSsMzkGk6Ei4TUjYDogGBFf0rYgII_l9WYpR4iVh0dz1YgLaPj2akCJ1kcje8eD4_em9BLJb6mnGJYLNkxkI5VKLyMGc9JVuzTdo_Y',
      alt: 'Dramatic mountain landscape reflecting in water',
    },
    {
      title: 'Urban Planning for a Warmer Planet',
      meta: 'Architecture | 10 min read',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDqnRL4gkGpabndv0XfEjs5nlQUDaSeZLE1tkhtFef5SVW8EAzTc371Bm1Adgpgsf-Xu8j42nJTrwHf6w7b4rtJFIvygan1DM3nuvPfA3YIqBpdGE3OWlvcyRwfTovBDLZZdc2szMlVfQnzi5WY4YT5gvW-zbzb5JIO0Wm86hdCzde6ss8PWL4yAfH162ZsLWkW1hYx5VKG75UvX6IS7Eh1ygNBwW0q8VN5N2zLOXBVix9CjRx3EOfka9qWRA_WS22tORmVTjm83sU',
      alt: 'Modern bridge architecture against a sunset sky',
    },
    {
      title: 'Finding Solitude in the Scottish Highlands',
      meta: 'Travel | 5 min read',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYcnby0TOrDhi-_orvkwnAUxElIk0La9RgymX17mWLDyBT1B9EgBGm0oqD-A6peVx-yIJxCuWr55C7rx9bTbYEFkdkpfK47aCFn3Jx5d5BEJTPEGh_IA-ZeJD1dKBofpTLxDfyvyCzxaHjrUGM9YRdxY2B_NM3lByqfdtrYUT-AkBPRmtRUlxA8S-PbOlWniUI_A1gLBBHXOte9zqD0kWqGpxhDn2ccF8sGyPTZeD7-wkoX1nHJiRcAeA4MrwpcISaJ5d1YXsM2k',
      alt: 'Kayaker on a crystal clear lake surrounded by mountains',
    },
  ],
}

const pooledArticles = [
  heroStory,
  ...topStories,
  ...latestArticles,
  ...categoryArticlePool,
].map((item) => ({
  slug: toArticleSlug(item.title),
  title: item.title,
  category: item.category || item.tag || 'World',
  image: item.image,
  alt: item.alt || item.title,
  excerpt: item.excerpt || item.summary || 'In-depth coverage from The Daily Observer newsroom.',
}))

const unique = new Map()
for (const item of pooledArticles) {
  if (!unique.has(item.slug)) {
    unique.set(item.slug, item)
  }
}

export const articleIndex = Array.from(unique.values())

export function getArticleBySlug(slug) {
  const found = articleIndex.find((item) => item.slug === slug)

  if (!found) {
    return { ...defaultArticle, slug: toArticleSlug(defaultArticle.title) }
  }

  return {
    ...defaultArticle,
    slug: found.slug,
    title: found.title,
    category: found.category,
    heroImage: found.image || defaultArticle.heroImage,
    heroAlt: found.alt || defaultArticle.heroAlt,
    intro: found.excerpt || defaultArticle.intro,
  }
}
