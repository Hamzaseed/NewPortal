import { useSelector } from 'react-redux'
import Icon from '../ui/Icon'

function SocialLinksDisplay({ links, variant = 'admin' }) {
  const adminLinks = useSelector((state) => state.settings.socialLinks)
  const authorLinks = useSelector((state) => state.authorSettings.socialLinks)
  const items = links || (variant === 'author' ? authorLinks : adminLinks)

  return (
    <div className="flex gap-2.5">
      {items.map((item) => {
        const url = String(item.url || '').toLowerCase()
        const iconName = url.includes('facebook')
          ? 'facebook'
          : url.includes('instagram')
            ? 'instagram'
            : url.includes('twitter') || url.includes('x.com')
              ? 'twitter_x'
              : url.includes('linkedin')
                ? 'linkedin'
                : url.includes('pinterest') || url.includes('pin.it')
                  ? 'pinterest'
                  : url.includes('linktr.ee') || url.includes('linktree')
                    ? 'linktree'
                    : url.includes('youtube')
                      ? 'youtube'
                      : url.includes('github')
                        ? 'github'
                        : url.includes('whatsapp')
                          ? 'chat_bubble'
                          : url.includes('telegram')
                            ? 'send'
                            : url.includes('tiktok')
                              ? 'tiktok'
                              : url.includes('reddit')
                                ? 'reddit'
                                : url.includes('discord') || url.includes('discord.gg')
                                  ? 'discord'
                                  : url.includes('twitch')
                                    ? 'twitch'
                                    : url.includes('snapchat')
                                      ? 'snapchat'
                                      : url.includes('threads.net') || url.includes('threads')
                                        ? 'threads'
                                        : url.includes('medium')
                                          ? 'article'
                                          : url.includes('behance')
                                            ? 'image'
                                            : url.includes('dribbble')
                                              ? 'language'
                                              : 'public'

        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8dee8] bg-white text-[#1d3557] transition hover:border-[#b9c4d6] hover:bg-slate-50"
          >
            <Icon name={iconName} className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinksDisplay
