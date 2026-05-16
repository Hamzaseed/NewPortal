import { useParams } from 'react-router-dom'
import ArticleComposer from '../../components/editor/ArticleComposer'
import AuthorShell from '../../components/author/AuthorShell'

function AuthorArticleCreatePage() {
  const { id } = useParams()

  return (
    <AuthorShell
      eyebrow="Content Desk"
      title={id ? 'Edit Article' : 'Add Article'}
      description={
        id
          ? 'Update your draft, reviewed story, or published article from the same composer.'
          : 'Draft a new story in a composer that mirrors the public article presentation, so writing and previewing happen in the same flow.'
      }
    >
      <ArticleComposer role="author" />
    </AuthorShell>
  )
}

export default AuthorArticleCreatePage
