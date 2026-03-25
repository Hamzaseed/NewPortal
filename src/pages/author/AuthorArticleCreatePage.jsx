import ArticleComposer from '../../components/editor/ArticleComposer'
import AuthorShell from '../../components/author/AuthorShell'

function AuthorArticleCreatePage() {
  return (
    <AuthorShell
      eyebrow="Content Desk"
      title="Add Article"
      description="Draft a new story in a composer that mirrors the public article presentation, so writing and previewing happen in the same flow."
    >
      <ArticleComposer role="author" />
    </AuthorShell>
  )
}

export default AuthorArticleCreatePage
