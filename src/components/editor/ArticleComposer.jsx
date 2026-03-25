import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { CalendarDays, Eye, FileText, Globe2, ImagePlus, Layers3, Send, Sparkles, Tag } from 'lucide-react'

const categoryOptions = ['World', 'Politics', 'Technology', 'Business', 'Culture', 'Lifestyle']
const statusOptions = ['Draft', 'Scheduled', 'Ready for review']

const defaultForm = {
  title: 'Inside the cities quietly redesigning how news is told',
  excerpt:
    'A closer look at the editors, systems, and small design decisions helping digital publications feel slower, clearer, and more trustworthy.',
  category: 'Culture',
  author: 'Editorial Desk',
  readTime: '7 min read',
  heroImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
  imageCredit: 'Photo by Jakob Owens',
  slug: 'cities-redesigning-how-news-is-told',
  seoDescription:
    'An editorial feature on how modern newsrooms are reshaping article experiences through calmer layouts, stronger reporting workflows, and better reader trust.',
  tags: 'News Design, Publishing, Editorial',
  publishDate: '2026-03-24',
  status: 'Draft',
  intro:
    'Modern newsroom design is no longer just about visual polish. It is increasingly tied to trust, pacing, and how readers move through complex reporting.',
  body:
    'Across independent publishers and legacy desks alike, article pages are becoming more intentional. Editors are balancing crisp typography, breathable spacing, and stronger visual hierarchy to help stories feel serious without feeling heavy.\n\nThat same shift is showing up behind the scenes. Authors want publishing tools that match the elegance of the front-end experience, with space for previews, metadata, and editorial signals all in one place.\n\nThe result is a calmer workflow: write, review, refine, and publish with a clearer sense of how the final story will actually land for readers.',
}

function ArticleComposer({ role = 'admin' }) {
  const [form, setForm] = useState(defaultForm)

  const tagList = useMemo(
    () =>
      form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  )

  const paragraphs = useMemo(
    () =>
      form.body
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [form.body],
  )

  const roleLabel = role === 'author' ? 'Author workspace' : 'Admin desk'
  const publishLabel = role === 'author' ? 'Send For Review' : 'Publish Article'

  function updateField(field) {
    return (event) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }
  }

  function handleSaveDraft() {
    toast.success('Draft saved', {
      description: `${form.title || 'Untitled article'} is stored in ${roleLabel.toLowerCase()}.`,
    })
  }

  function handlePreview() {
    toast('Preview refreshed', {
      description: 'The live story preview now reflects your latest edits.',
    })
  }

  function handlePublish() {
    toast.success(role === 'author' ? 'Article sent for review' : 'Article published', {
      description:
        role === 'author'
          ? 'Editors can now review, polish, and schedule this story.'
          : 'The story is ready for readers and distribution channels.',
    })
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
              Draft the headline, sharpen the opening, and tune the publishing details without losing sight of the final reading experience.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Headline</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={updateField('title')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-display text-2xl font-extrabold text-slate-950 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Standfirst</span>
                <textarea
                  rows={4}
                  value={form.excerpt}
                  onChange={updateField('excerpt')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Category</span>
                <select
                  value={form.category}
                  onChange={updateField('category')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Author</span>
                <input
                  type="text"
                  value={form.author}
                  onChange={updateField('author')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Read Time</span>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={updateField('readTime')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Status</span>
                <select
                  value={form.status}
                  onChange={updateField('status')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Hero Image URL</span>
                <div className="relative mt-3">
                  <ImagePlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.heroImage}
                    onChange={updateField('heroImage')}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Image Credit</span>
                <input
                  type="text"
                  value={form.imageCredit}
                  onChange={updateField('imageCredit')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-5">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Opening Paragraph</span>
                <textarea
                  rows={4}
                  value={form.intro}
                  onChange={updateField('intro')}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Story Body</span>
                <textarea
                  rows={12}
                  value={form.body}
                  onChange={updateField('body')}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 text-base leading-8 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Editorial Preview</p>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Live article card</h3>
            </div>
          </div>

          <article className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-background-light">
            <div className="aspect-[16/8] overflow-hidden bg-slate-200">
              <img src={form.heroImage} alt={form.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{form.category}</span>
                <span>{form.publishDate}</span>
                <span>{form.readTime}</span>
              </div>
              <h3 className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                {form.title}
              </h3>
              <p className="max-w-3xl text-base leading-7 text-slate-600">{form.excerpt}</p>
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                <div>
                  <p className="text-sm font-bold text-slate-900">{form.author}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{form.imageCredit}</p>
                </div>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <Eye className="h-4 w-4" />
                  Refresh preview
                </button>
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
              <span>Headline, excerpt, and body are styled to match the reading experience.</span>
            </div>
            <div className="flex items-start gap-3">
              <Layers3 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Metadata stays close by so editors can tune story structure without leaving the page.</span>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>SEO, tags, and scheduling are ready before distribution begins.</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={handlePublish}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              {publishLabel}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
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
                onChange={updateField('slug')}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Meta Description</span>
              <textarea
                rows={5}
                value={form.seoDescription}
                onChange={updateField('seoDescription')}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tags</span>
              <input
                type="text"
                value={form.tags}
                onChange={updateField('tags')}
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
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-extrabold text-slate-950">Schedule</h3>
          </div>
          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Publish Date</span>
            <input
              type="date"
              value={form.publishDate}
              onChange={updateField('publishDate')}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
            />
          </label>
          <div className="mt-5 rounded-2xl bg-background-light p-4 text-sm leading-6 text-slate-600">
            This article is currently marked as <span className="font-bold text-slate-900">{form.status}</span> and will use the selected
            publish date for editorial planning.
          </div>
        </section>

        <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Story preview text</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
            <p>{form.intro}</p>
            {paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

export default ArticleComposer
