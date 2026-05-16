export async function shareArticle({ title, text, url }) {
  if (navigator.share) {
    await navigator.share({
      title,
      text,
      url,
    })

    return 'shared'
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url)
    return 'copied'
  }

  window.prompt('Copy this link:', url)
  return 'copied'
}
