import ArticleComposer from '../components/editor/ArticleComposer'

function AdminArticleCreatePage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Articles</p>
        <h1 className="mt-1 text-xl font-bold sm:text-2xl">Create Article</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Build a new story with the same editorial rhythm, imagery, and metadata structure used on the article page.
        </p>
      </div>

      <ArticleComposer role="admin" />
    </section>
  )
}

export default AdminArticleCreatePage
