import { BookOpen, ChartColumn, LayoutDashboard, Settings } from 'lucide-react'

export const AUTHOR_NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/author/dashboard' },
  { label: 'My Articles', icon: BookOpen, path: '/author/articles' },
  { label: 'Analytics', icon: ChartColumn, path: '/author/analytics' },
  { label: 'Settings', icon: Settings, path: '/author/settings' },
]

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', key: 'dashboard', path: '/admin/dashboard' },
  { label: 'Markets', key: 'monitoring', path: '/admin/markets' },
  { label: 'Articles', key: 'article', path: '/admin/articles' },
  { label: 'Videos', key: 'play_circle', path: '/admin/videos' },
  { label: 'Categories', key: 'category', path: '/admin/categories' },
  { label: 'Authors', key: 'people', path: '/admin/authors' },
  { label: 'Advertising', key: 'campaign', path: '/admin/advertising' },
  { label: 'Subscribers', key: 'group', path: '/admin/subscribers' },
  { label: 'Packages', key: 'loyalty', path: '/admin/subscription-packages' },
  { label: 'Comments', key: 'forum', path: '/admin/comments' },
  { label: 'Analytics', key: 'insights', path: '/admin/analytics' },
  { label: 'CMS', key: 'dashboard_customize', path: '/admin/cms' },
  { label: 'Permissions', key: 'admin_panel_settings', path: '/admin/permissions' },
]
