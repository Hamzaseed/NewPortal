import AuthorShell from '../../components/author/AuthorShell'
import VideoComposer from '../../components/editor/VideoComposer'

function AuthorVideoCreatePage() {
  return (
    <AuthorShell
      eyebrow="Video Desk"
      title="Add Video"
      description="Package a video with its source, external link, and transcript in the same workflow you use for editorial submissions."
    >
      <VideoComposer />
    </AuthorShell>
  )
}

export default AuthorVideoCreatePage
