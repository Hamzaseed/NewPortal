import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Eye, FileText, Globe2, ImagePlus, Layers3, Send, Tag } from 'lucide-react'
import ArticleContentBuilder from './ArticleContentBuilder'
import { useAuth } from '../../context/AuthContext'
import { createArticle, fetchArticleById, setContentBlocks, updateArticle } from '../../../app/articles/articleSlice'
import { fetchPublicCategories } from '../../../app/categories/categoriesSlice'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const MBL_LOGO_IMAGE = '/mbl_logo.png'

const defaultForm = {
  title: '',
  excerpt: '',
  category: '',
  author: '',
  readTime: '',
  heroImage: '',
  imageCredit: '',
  slug: '',
  seoDescription: '',
  tags: '',
}

function ArticleComposer({ role = 'admin' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const contentBlocks = useSelector((state) => state.articles.contentBlocks)
  const article = useSelector((state) => state.articles.article)
  const loading = useSelector((state) => state.articles.loading)
  const categories = useSelector((state) => state.categories.categories)
  const [form, setForm] = useState(role === 'admin' ? { ...defaultForm, category: 'Latest', heroImage: MBL_LOGO_IMAGE } : defaultForm)

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchPublicCategories())
    }
  }, [categories.length, dispatch])

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
      return
    }

    setForm(role === 'admin' ? { ...defaultForm, category: 'Latest', heroImage: MBL_LOGO_IMAGE } : defaultForm)
    dispatch(setContentBlocks([]))
  }, [dispatch, id, role])

  useEffect(() => {
    if (!id || !article || String(article.id) !== String(id)) {
      return
    }

    setForm({
      title: article.title || '',
      excerpt: article.excerpt || '',
      category: article.category || '',
      author: article.author || '',
      readTime: article.read_time || '',
      heroImage: role === 'admin' ? MBL_LOGO_IMAGE : article.hero_image || '',
      imageCredit: article.image_credit || '',
      slug: article.slug || '',
      seoDescription: article.seo_description || '',
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
    })
  }, [article, id])

  useEffect(() => {
    if (role !== 'author' || id) {
      return
    }

    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim()

    if (!fullName) {
      return
    }

    setForm((current) => ({
      ...current,
      author: fullName,
    }))
  }, [id, role, user?.first_name, user?.last_name])

  useEffect(() => {
    if (role !== 'author' || id || form.category) {
      return
    }

    const firstCategory = categories.find((category) => category.is_active && category.name !== 'Latest')

    if (!firstCategory) {
      return
    }

    setForm((current) => ({
      ...current,
      category: firstCategory.name,
    }))
  }, [categories, form.category, id, role])

  const tagList = form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  const paragraphs = contentBlocks
    .filter((block) => block.type === 'paragraph')
    .map((block) => block.content.trim())
    .filter(Boolean)

  const roleLabel = role === 'author' ? 'Author workspace' : 'Admin desk'
  const publishLabel = role === 'author' ? 'Send For Review' : 'Publish Article'

  async function handleHeroImageUpload(file) {
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('heroImage', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/upload-image`, {
        method: 'POST',
        headers: {
          ...(localStorage.getItem('auth_token')
            ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            : {}),
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Could not upload image')
      }

      setForm((current) => ({
        ...current,
        heroImage:
          data?.url ||
          data?.imageUrl ||
          data?.image_url ||
          data?.path ||
          data?.file_path ||
          data?.file?.path ||
          data?.image ||
          '',
      }))
    } catch (error) {
      toast.error(error.message || 'Could not upload image')
    }
  }

  async function handleSaveDraft() {
    const selectedCategory =
      form.category ||
      (role === 'admin'
        ? 'Latest'
        : categories.find((category) => category.is_active && category.name !== 'Latest')?.name || '')

    if (!selectedCategory) {
      toast.error('Category is required')
      return
    }

    if (!form.readTime) {
      toast.error('Read time is required')
      return
    }

    if (role !== 'admin' && !form.heroImage) {
      toast.error('Hero image URL is required')
      return
    }

    if (!paragraphs.length) {
      toast.error('Add at least one paragraph')
      return
    }

    const data = {
      title: form.title,
      excerpt: form.excerpt,
      category: selectedCategory,
      author: form.author,
      status: 'Draft',
      readTime: form.readTime,
      heroImage: role === 'admin' ? MBL_LOGO_IMAGE : form.heroImage,
      imageCredit: form.imageCredit,
      slug: form.slug,
      seoDescription: form.seoDescription,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      contentBlocks,
    }

    try {
      if (id) {
        await dispatch(updateArticle({ id, data })).unwrap()
      } else {
        await dispatch(createArticle(data)).unwrap()
      }

      toast.success('Draft saved', {
        description: `${form.title || 'Untitled article'} is stored in ${roleLabel.toLowerCase()}.`,
      })
      navigate(role === 'author' ? '/author/articles' : '/admin/articles')
    } catch (error) {
      toast.error(error || 'Could not save draft')
    }
  }

  async function handlePublish() {
    const selectedCategory =
      form.category ||
      (role === 'admin'
        ? 'Latest'
        : categories.find((category) => category.is_active && category.name !== 'Latest')?.name || '')

    if (!selectedCategory) {
      toast.error('Category is required')
      return
    }

    if (!form.readTime) {
      toast.error('Read time is required')
      return
    }

    if (role !== 'admin' && !form.heroImage) {
      toast.error('Hero image URL is required')
      return
    }

    if (!paragraphs.length) {
      toast.error('Add at least one paragraph')
      return
    }

    const data = {
      title: form.title,
      excerpt: form.excerpt,
      category: selectedCategory,
      author: form.author,
      status: role === 'author' ? 'Ready for review' : 'Published',
      readTime: form.readTime,
      heroImage: role === 'admin' ? MBL_LOGO_IMAGE : form.heroImage,
      imageCredit: form.imageCredit,
      slug: form.slug,
      seoDescription: form.seoDescription,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      contentBlocks,
    }

    try {
      if (id) {
        await dispatch(updateArticle({ id, data })).unwrap()
      } else {
        await dispatch(createArticle(data)).unwrap()
      }

      toast.success(role === 'author' ? 'Article sent for review' : 'Article published', {
        description:
          role === 'author'
            ? 'Editors can now review, polish, and schedule this story.'
            : 'The story is ready for readers and distribution channels.',
      })
      navigate(role === 'author' ? '/author/articles' : '/admin/articles')
    } catch (error) {
      toast.error(error || 'Could not save article')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-sm">
          <div className="border-b border-primary/10 bg-[linear-gradient(135deg,rgba(107,20,33,0.07),rgba(15,23,42,0.02))] px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 text-primary shadow-sm">Article Composer</span>
              <span>{roleLabel}</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
              Shape the story in the same visual language readers see on the published article page.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Draft the headline, sharpen the structure, and place images, links, and bullet points exactly where they should appear in the article flow.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Headline</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-display text-2xl font-extrabold text-slate-950 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Standfirst</span>
                <textarea
                  rows={4}
                  value={form.excerpt}
                  onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Category</span>
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                >
                  {categories.length > 0 ? (
                    (role === 'admin'
                      ? [
                          { id: 'latest-default', name: 'Latest' },
                          ...categories.filter((category) => category.is_active && category.name !== ''),
                        ]
                      : categories.filter((category) => category.is_active && category.name !== 'Latest')
                    ).map((category) => (
                      <option key={category.id || category.slug || category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option value={form.category}>{form.category}</option>
                  )}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Author</span>
                <input
                  type="text"
                  value={form.author}
                  onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Read Time</span>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(event) => setForm((current) => ({ ...current, readTime: event.target.value }))}
                  required
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

            </div>

            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Hero Image</span>
                <div className="relative mt-3 rounded-2xl border-2 border-dashed border-primary/15 bg-white p-6 text-center">
                  {form.heroImage ? (
                    <img
                      src={form.heroImage.startsWith('/uploads/') ? `${API_BASE_URL}${form.heroImage}` : form.heroImage}
                      alt={form.title || 'Hero preview'}
                      className="mx-auto h-40 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                        <ImagePlus className="h-6 w-6 text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-500">Upload from your computer or paste an image URL below</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(event) => handleHeroImageUpload(event.target.files?.[0])}
                  />
                </div>
                <div className="relative mt-3">
                  <ImagePlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={form.heroImage}
                    onChange={(event) => setForm((current) => ({ ...current, heroImage: event.target.value }))}
                    placeholder="https://..."
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Image Credit</span>
                <input
                  type="text"
                  value={form.imageCredit}
                  onChange={(event) => setForm((current) => ({ ...current, imageCredit: event.target.value }))}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>
          </div>
        </section>

        <ArticleContentBuilder />

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Editorial Preview</p>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Live article preview</h3>
            </div>
            <button
              type="button"
              onClick={() =>
                toast('Preview refreshed', {
                  description: 'The live story preview now reflects your latest edits, images, links, and points.',
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              <Eye className="h-4 w-4" />
              Refresh preview
            </button>
          </div>

          <article className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-background-light">
            <div className="aspect-[16/8] overflow-hidden bg-slate-200">
              <img
                src={form.heroImage.startsWith('/uploads/') ? `${API_BASE_URL}${form.heroImage}` : form.heroImage}
                alt={form.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{form.category}</span>
                <span>{form.readTime}</span>
              </div>
              <div className="space-y-4 border-b border-slate-200 pb-6">
                <h3 className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                  {form.title}
                </h3>
                <p className="max-w-3xl text-base leading-7 text-slate-600">{form.excerpt}</p>
                <div>
                  <p className="text-sm font-bold text-slate-900">{form.author}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{form.imageCredit}</p>
                </div>
              </div>

              <div className="space-y-8">
                {contentBlocks.map((block) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={block.id} className={`text-[1.05rem] leading-8 text-slate-800 md:text-[1.14rem] ${block.bold ? 'font-bold text-slate-950' : ''}`}>
                        {block.content}
                      </p>
                    )
                  }

                  if (block.type === 'heading') {
                    const HeadingTag = block.level || 'h2'
                    const sizeClassMap = {
                      h1: 'text-5xl md:text-6xl',
                      h2: 'text-3xl md:text-4xl',
                      h3: 'text-2xl md:text-3xl',
                      h4: 'text-xl md:text-2xl',
                      h5: 'text-lg md:text-xl',
                      h6: 'text-base md:text-lg',
                    }

                    return (
                      <HeadingTag
                        key={block.id}
                        className={`pt-4 font-display leading-tight text-slate-950 ${sizeClassMap[HeadingTag]} ${block.bold ? 'font-extrabold' : 'font-bold'}`}
                      >
                        {block.content}
                      </HeadingTag>
                    )
                  }

                  if (block.type === 'image') {
                    return (
                      <figure key={block.id} className="mx-auto w-full max-w-2xl space-y-3">
                        <img
                          src={block.src?.startsWith('/uploads/') ? `${API_BASE_URL}${block.src}` : block.src}
                          alt={block.alt}
                          className="w-full rounded-sm object-cover"
                        />
                        {block.caption ? <figcaption className="border-b border-slate-200 pb-4 text-sm leading-6 text-slate-500">{block.caption}</figcaption> : null}
                      </figure>
                    )
                  }

                  if (block.type === 'quote') {
                    return (
                      <blockquote
                        key={block.id}
                        className={`border-l-4 border-primary bg-primary/5 px-6 py-6 font-display text-2xl italic leading-relaxed text-slate-900 ${block.bold ? 'font-bold' : ''}`}
                      >
                        "{block.content}"
                      </blockquote>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={block.id} className="list-disc space-y-3 pl-6 text-[1.05rem] leading-8 text-slate-800 marker:text-primary">
                        {block.items.filter(Boolean).map((item, index) => (
                          <li key={`${block.id}-${index}`}>{item}</li>
                        ))}
                      </ul>
                    )
                  }

                  if (block.type === 'link') {
                    return (
                      <p key={block.id}>
                        <a href={block.href} target="_blank" rel="noreferrer" className="text-lg font-bold text-primary underline underline-offset-4 hover:text-slate-900">
                          {block.label || block.href}
                        </a>
                      </p>
                    )
                  }

                  if (block.type === 'tweet') {
                    return (
                      <div key={block.id} className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                        {block.url ? (
                          <iframe
                            src={`https://twitframe.com/show?url=${encodeURIComponent(block.url)}`}
                            title="Embedded X post preview"
                            className="min-h-[720px] w-full"
                            frameBorder="0"
                          />
                        ) : (
                          <div className="p-5 text-sm text-slate-500">Paste an X post link to preview it here.</div>
                        )}
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </div>
          </article>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-primary/10 bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Publishing Panel</p>
          <h3 className="mt-3 text-2xl font-extrabold">Keep the article launch-ready.</h3>
          <div className="mt-6 space-y-4 text-sm text-white/80">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              <span>Headline, standfirst, and content blocks are styled to match the reading experience.</span>
            </div>
            <div className="flex items-start gap-3">
              <Layers3 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Editors can insert multiple images, bold links, and bullet points anywhere in the story.</span>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>SEO, tags, and publishing details are ready before distribution begins.</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePublish}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                {publishLabel}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Save Draft
              </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-extrabold text-slate-950">SEO and discovery</h3>
          </div>

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Slug</span>
              <input
                type="text"
                value={form.slug}
                onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Meta Description</span>
              <textarea
                rows={5}
                value={form.seoDescription}
                onChange={(event) => setForm((current) => ({ ...current, seoDescription: event.target.value }))}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tags</span>
              <input
                type="text"
                value={form.tags}
                onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Story preview text</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
            {paragraphs.slice(0, 3).map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

export default ArticleComposer
