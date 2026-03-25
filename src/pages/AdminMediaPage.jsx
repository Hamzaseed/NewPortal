import Icon from '../components/ui/Icon'
import { useNavigate } from 'react-router-dom'

function AdminMediaPage() {
  const navigate = useNavigate()

  return (
    <div className="layout-container relative flex min-h-screen grow flex-col overflow-x-hidden bg-background-light font-display text-slate-900">
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-8">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-primary/5"
          >
            <Icon name="chevron_left" className="h-4 w-4" />
            Back
          </button>
        </div>

        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <a href="#" className="transition-colors hover:text-primary">Dashboard</a>
          <Icon name="chevron_right" className="h-3.5 w-3.5" />
          <a href="#" className="transition-colors hover:text-primary">Articles</a>
          <Icon name="chevron_right" className="h-3.5 w-3.5" />
          <span className="font-semibold text-primary">Create New</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <section className="rounded-lg border border-primary/10 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Article Title..."
                  className="w-full border-none bg-transparent p-0 text-4xl font-bold placeholder:text-slate-300 focus:border-none focus:ring-0"
                />
              </div>

              <div className="mb-10">
                <textarea
                  rows={2}
                  placeholder="Enter a brief summary or subtitle..."
                  className="w-full resize-none border-none bg-transparent p-0 text-xl italic text-slate-500 focus:border-none focus:ring-0"
                />
              </div>

              <div className="overflow-hidden rounded border border-primary/20">
                <div className="flex flex-wrap items-center gap-1 border-b border-primary/10 bg-slate-50 p-2">
                  {[
                    'format_bold',
                    'format_italic',
                    'format_underlined',
                    'link',
                    'format_quote',
                    'image',
                    'code',
                    'format_list_bulleted',
                    'format_list_numbered',
                    'format_align_left',
                    'format_align_center',
                  ].map((tool) => (
                    <button key={tool} type="button" className="rounded p-1.5 text-slate-700 hover:bg-primary/10">
                      <Icon name={tool} className="h-5 w-5" />
                    </button>
                  ))}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[500px] p-8 text-lg leading-relaxed text-slate-800 focus:outline-none"
                >
                  Start writing your story here...
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-primary/10 bg-white p-8 shadow-sm">
              <h3 className="mb-6 border-b border-primary/10 pb-2 text-lg font-bold">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">URL Slug</label>
                  <div className="flex overflow-hidden rounded border border-primary/20">
                    <span className="bg-slate-100 px-3 py-2 text-sm text-slate-500">dailyobserver.com/</span>
                    <input type="text" placeholder="your-article-title" className="admin-input flex-1 border-none bg-transparent py-2 text-sm focus:ring-0" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Meta Description</label>
                  <textarea
                    rows={3}
                    placeholder="Description for search engine results..."
                    className="admin-textarea w-full bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full space-y-6 lg:w-80">
            <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
              <div className="border-b border-primary/10 p-5">
                <h3 className="font-bold">Publish</h3>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Status:</span><span className="font-semibold text-primary">Draft</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Visibility:</span><span className="font-semibold">Public</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Revisions:</span><span className="font-semibold">0</span></div>
                <button type="button" className="mt-2 w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90">Publish Now</button>
              </div>
            </section>

            <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
              <div className="border-b border-primary/10 p-5"><h3 className="font-bold">Category</h3></div>
              <div className="p-5">
                <select className="admin-select w-full bg-transparent text-sm">
                  <option>Select Category</option>
                  <option>Politics</option>
                  <option>Technology</option>
                  <option>Business</option>
                  <option>World</option>
                  <option>Lifestyle</option>
                  <option>Culture</option>
                </select>
              </div>
            </section>

            <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
              <div className="border-b border-primary/10 p-5"><h3 className="font-bold">Featured Image</h3></div>
              <div className="p-5">
                <div className="relative mb-4 flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded border-2 border-dashed border-primary/20 bg-primary/5 transition-colors hover:bg-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ7Cn4r1WJyFWeptTio44TsoT16HaP_PAdMFX0ufENJ5xdQEHAdYKGbqZSVch1v-gYtpO4GfjCq0Sr3EnOz-daGItIAJjnW6kiPhPzLbwpt8qYAxZg8XzRxCAC3nQ0qKtSdBMRLlxD9LjesA0tcyqwnMrBTcwbZxmWcAqc07RSKYq74VJ3X6mRPawieL8NTilmjRkbS89w-OpVapXLW0adlfAiimOoRt9KRK9JRh3C9Udu04Hm8lPBGj4C2yr0qR0vNoCmnx8TMlg"
                      alt="News placeholder"
                      className="h-full w-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <Icon name="cloud_upload" className="mb-2 h-10 w-10 text-primary/60" />
                      <p className="text-center text-xs font-medium text-slate-600">Click to upload or drag & drop</p>
                    </div>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary hover:underline">Set featured image</a>
              </div>
            </section>

            <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
              <div className="border-b border-primary/10 p-5"><h3 className="font-bold">Tags</h3></div>
              <div className="p-5">
                <input type="text" placeholder="Add tag..." className="admin-input mb-3 w-full bg-transparent text-sm" />
                <div className="flex flex-wrap gap-2">
                  {['Breaking News', 'Politics'].map((tag) => (
                    <span key={tag} className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                      {tag} <Icon name="close" className="h-3.5 w-3.5 cursor-pointer" />
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="sticky bottom-0 z-50 w-full border-t border-primary/10 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Icon name="schedule" className="h-4 w-4" /> Last saved at 10:45 AM</span>
          </div>
          <div className="flex gap-3">
            <button type="button" className="rounded-lg border border-primary/20 px-6 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-primary/5">Save Draft</button>
            <button type="button" className="flex items-center gap-2 rounded-lg border border-primary/20 px-6 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-primary/5">
              <Icon name="visibility" className="h-4 w-4" /> Preview
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AdminMediaPage
