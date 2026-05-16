import { Heading1, ImagePlus, Link2, List, MessageSquareQuote, Plus, TextCursorInput, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setContentBlocks } from '../../../app/articles/articleSlice'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function createBlock(type) {
  const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

  if (type === 'heading') {
    return { id, type, content: 'New section heading', level: 'h2', bold: false }
  }

  if (type === 'image') {
    return {
      id,
      type,
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Inserted story image',
      caption: 'Add an image caption to explain why this visual matters.',
    }
  }

  if (type === 'list') {
    return { id, type, items: ['First point', 'Second point', 'Third point'] }
  }

  if (type === 'quote') {
    return { id, type, content: 'Add a pull quote or strong excerpt from the reporting.', bold: false }
  }

  if (type === 'link') {
    return { id, type, label: 'Add reference link', href: 'https://example.com' }
  }

  if (type === 'tweet') {
    return {
      id,
      type,
      url: 'https://x.com/Interior/status/463440424141459456',
    }
  }

  return { id, type: 'paragraph', content: 'Add a new paragraph here.', bold: false }
}

function InsertBlockBar({ onInsert }) {
  const options = [
    ['paragraph', 'Paragraph', TextCursorInput],
    ['heading', 'Heading', Heading1],
    ['image', 'Image', ImagePlus],
    ['list', 'Points', List],
    ['link', 'Link', Link2],
    ['tweet', 'X Post', MessageSquareQuote],
    ['quote', 'Quote', MessageSquareQuote],
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([type, label, IconComponent]) => (
        <button
          key={type}
          type="button"
          onClick={() => onInsert(type)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-primary hover:text-primary"
        >
          <IconComponent className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  )
}

function blockIcon(type) {
  if (type === 'heading') return Heading1
  if (type === 'image') return ImagePlus
  if (type === 'list') return List
  if (type === 'quote') return MessageSquareQuote
  if (type === 'tweet') return MessageSquareQuote
  if (type === 'link') return Link2
  return TextCursorInput
}

function blockLabel(type) {
  if (type === 'heading') return 'Heading'
  if (type === 'image') return 'Image'
  if (type === 'list') return 'Bullet Points'
  if (type === 'quote') return 'Quote'
  if (type === 'tweet') return 'X Post'
  if (type === 'link') return 'Bold Link'
  return 'Paragraph'
}

function ArticleContentBuilder() {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.articles.contentBlocks)

  function setBlocks(updater) {
    const nextBlocks = typeof updater === 'function' ? updater(blocks) : updater
    dispatch(setContentBlocks(nextBlocks))
  }

  function updateBlock(blockId, updater) {
    setBlocks((current) => current.map((block) => (block.id === blockId ? updater(block) : block)))
  }

  function insertBlockAt(index, type) {
    const nextBlock = createBlock(type)
    setBlocks((current) => {
      const copy = [...current]
      copy.splice(index, 0, nextBlock)
      return copy
    })
  }

  function removeBlock(blockId) {
    setBlocks((current) => current.filter((block) => block.id !== blockId))
  }

  async function handleImageUpload(blockId, file) {
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('image', file)

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

      updateBlock(blockId, (current) => ({
        ...current,
        src:
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

  return (
    <section className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Story Builder</p>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Build content blocks</h3>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
          {blocks.length} blocks
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Add block at the end</p>
        <InsertBlockBar onInsert={(type) => insertBlockAt(blocks.length, type)} />
      </div>

      <div className="mt-8 space-y-6">
        {blocks.map((block, index) => {
          const BlockIcon = blockIcon(block.type)

          return (
            <article key={block.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 text-primary shadow-sm">
                    <BlockIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Block {index + 1}</p>
                    <h4 className="text-base font-bold text-slate-950">{blockLabel(block.type)}</h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-700 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {(block.type === 'paragraph' || block.type === 'heading' || block.type === 'quote') && (
                  <div className="space-y-4">
                    {block.type === 'heading' && (
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Heading Level</span>
                        <select
                          value={block.level || 'h2'}
                          onChange={(event) => updateBlock(block.id, (current) => ({ ...current, level: event.target.value }))}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                        >
                          {headingLevels.map((level) => (
                            <option key={level} value={level}>
                              {level.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}

                    <textarea
                      rows={block.type === 'heading' ? 2 : 5}
                      value={block.content}
                      onChange={(event) => updateBlock(block.id, (current) => ({ ...current, content: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-primary"
                    />

                    <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                      <input
                        type="checkbox"
                        checked={Boolean(block.bold)}
                        onChange={(event) => updateBlock(block.id, (current) => ({ ...current, bold: event.target.checked }))}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      Bold text
                    </label>
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="grid gap-4">
                    <div className="relative rounded-2xl border-2 border-dashed border-primary/15 bg-white p-6 text-center">
                      {block.src ? (
                        <img
                          src={block.src.startsWith('/uploads/') ? `${API_BASE_URL}${block.src}` : block.src}
                          alt={block.alt || 'Story image preview'}
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
                        onChange={(event) => handleImageUpload(block.id, event.target.files?.[0])}
                      />
                    </div>
                    <input
                      type="url"
                      value={block.src}
                      onChange={(event) => updateBlock(block.id, (current) => ({ ...current, src: event.target.value }))}
                      placeholder="https://..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={block.alt}
                        onChange={(event) => updateBlock(block.id, (current) => ({ ...current, alt: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                      />
                      <input
                        type="text"
                        value={block.caption}
                        onChange={(event) => updateBlock(block.id, (current) => ({ ...current, caption: event.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {block.type === 'list' && (
                  <div className="space-y-3">
                    {block.items.map((item, itemIndex) => (
                      <input
                        key={`${block.id}-${itemIndex}`}
                        type="text"
                        value={item}
                        onChange={(event) =>
                          updateBlock(block.id, (current) => ({
                            ...current,
                            items: current.items.map((entry, entryIndex) => (entryIndex === itemIndex ? event.target.value : entry)),
                          }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => updateBlock(block.id, (current) => ({ ...current, items: [...current.items, 'New point'] }))}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add point
                    </button>
                  </div>
                )}

                {block.type === 'link' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={block.label}
                      onChange={(event) => updateBlock(block.id, (current) => ({ ...current, label: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-primary"
                    />
                    <input
                      type="text"
                      value={block.href}
                      onChange={(event) => updateBlock(block.id, (current) => ({ ...current, href: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                    />
                  </div>
                )}

                {block.type === 'tweet' && (
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={block.url || ''}
                      onChange={(event) => updateBlock(block.id, (current) => ({ ...current, url: event.target.value }))}
                      placeholder="https://x.com/... or https://twitter.com/..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary"
                    />
                    <p className="text-xs text-slate-500">Paste an X or Twitter post link and it will show as an embedded post on the article page.</p>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Insert new block after this one</p>
                <InsertBlockBar onInsert={(type) => insertBlockAt(index + 1, type)} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function makeDefaultBlocks() {
  return [
    createBlock('paragraph'),
    createBlock('heading'),
    createBlock('paragraph'),
  ]
}

export default ArticleContentBuilder
