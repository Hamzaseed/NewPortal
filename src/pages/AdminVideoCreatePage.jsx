import VideoComposer from '../components/editor/VideoComposer'
import { useParams } from 'react-router-dom'

function AdminVideoCreatePage() {
  const { id } = useParams()
  const isEditMode = Boolean(id)

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Videos</p>
        <h1 className="mt-1 text-xl font-bold sm:text-2xl">{isEditMode ? 'Edit Video' : 'Create Video'}</h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {isEditMode
            ? 'Update the video details, preview, transcript, and publishing metadata in one composer.'
            : 'Build a simple video entry with the player source, supporting link, transcript, and publishing metadata in one composer.'}
        </p>
      </div>

      <VideoComposer />
    </section>
  )
}

export default AdminVideoCreatePage
