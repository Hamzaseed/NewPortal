import {
  BookOpen,
  ChartColumn,
  Clock3,
  Eye,
  FileText,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'

export const authorProfile = {
  name: 'Alex River',
  role: 'Senior Features Editor',
  email: 'author@example.com',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWvt_WLO4A-0kPEGq79kescFJTjGgUMEyH7p420fAIvtu8eTuJVjdBj9qamtFv2QUzH3KMbxwQwvmWcvnnlnelUWqMwqfQxKd0-ozg3qmvsexItH0-enn2OFe6YqLKYMfVdjkJVMdycKZnYdJHQmeUACJ2wq2AGF48liDQfOmppAqAp5YgpSd4wAz-3tZf4SEZhxg4RIH-LkOheEOtqTloNEQEWu3j0poebIAF8mKOZ8J5Nal-1XC5sCzyKgUVc6kaLrmwX1FEBQ',
  bio: 'Digital curator and investigative journalist covering AI, culture, and the systems shaping modern media.',
}

export const authorNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/author/dashboard' },
  { label: 'My Articles', icon: BookOpen, path: '/author/articles' },
  { label: 'Analytics', icon: ChartColumn, path: '/author/analytics' },
  { label: 'Settings', icon: Settings, path: '/author/settings' },
]

export const dashboardStats = [
  { label: 'Published Stories', value: '142', delta: '+12%', icon: FileText, tone: 'text-primary', chip: 'bg-emerald-50 text-emerald-700' },
  { label: 'Total Views', value: '84.2k', delta: '+24%', icon: Eye, tone: 'text-violet-700', chip: 'bg-emerald-50 text-emerald-700' },
  { label: 'Reader Love', value: '12.8k', delta: '+5%', icon: Heart, tone: 'text-rose-700', chip: 'bg-rose-50 text-rose-700' },
  { label: 'Subscribers', value: '2,410', delta: '+18%', icon: Users, tone: 'text-amber-700', chip: 'bg-emerald-50 text-emerald-700' },
]

export const authorArticles = [
  {
    id: 'ai-newsrooms',
    title: 'The Future of AI in Modern Newsrooms',
    category: 'Technology',
    date: 'Oct 24, 2023',
    meta: 'Oct 24, 2023 | Technology',
    status: 'Published',
    views: '12,402',
    likes: '842',
    comments: 64,
    readTime: '6 min read',
    seo: 'Strong',
    priority: 'Evergreen',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'urban-sustainability',
    title: 'Sustainability and the New Urbanism',
    category: 'Architecture',
    date: 'Oct 22, 2023',
    meta: 'Oct 22, 2023 | Architecture',
    status: 'Draft',
    views: '--',
    likes: '--',
    comments: 12,
    readTime: '8 min read',
    seo: 'Needs work',
    priority: 'Review',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'long-form-journalism',
    title: 'Mastering Long-form Journalism in 2024',
    category: 'Editorial',
    date: 'Oct 19, 2023',
    meta: 'Oct 19, 2023 | Editorial',
    status: 'Published',
    views: '8,920',
    likes: '1,204',
    comments: 41,
    readTime: '9 min read',
    seo: 'Excellent',
    priority: 'High performing',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'audience-trust',
    title: 'Audience Trust in the Subscription Era',
    category: 'Media',
    date: 'Oct 16, 2023',
    meta: 'Oct 16, 2023 | Media',
    status: 'Scheduled',
    views: '--',
    likes: '--',
    comments: 5,
    readTime: '5 min read',
    seo: 'Ready',
    priority: 'Scheduled',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
]

export const recentFeedback = [
  {
    name: 'Jane Doe',
    time: '2m ago',
    text: 'This article on AI newsrooms was exactly what I needed for my thesis. Great insights!',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBftJRERw01FfiaHh6lW0BVX5U18v2rnnU9MX6cuFPIiin18A0v4PGZM_u5o1BLgTujFbEbRwgGNBW5zKHGCzA5--AvWB0Ff8HVe9-GU8IHzcLnInUF9ZIqRk2hUeSw8VNiddVsxDsUOhV7gCevgl_WD3Ay8IMrxstfqNNqi0Bybsg9be2RkjVxKFATyltSN3eqkRHOSwNMJMNXJyk15u0LcfQ_mfSfnvMPWwmv7VFMqrXFQIlhHoAyuXqnpQEEfs7z9PE1wxNu5a8',
  },
  {
    name: 'Mark K.',
    time: '1h ago',
    text: 'Would love to see a follow-up piece specifically about localized SEO for these newsrooms.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4R9bHk-iHlqwrz4vVLx14TSjIYQhxRcib50wazHz0HjzaGq_O5-mtGtbSGCQzyiV5J80fGjvEUq6A5WGH7nuv-VWGyjS5ELPZai0gXDQnyGQvRVyPZ_UeIfMNOoanwwKSNDNDrkpoSQV3oDO-MHPIOiRj97zz7hQ-N89q2Mwp90rw0x6naFBtGD5j7C2sDeztQimzRPXH3WyrF4erEYRkPQzdl3mEPe4LIWASrb3zSce6HfHauujOXFT2Wpsbl8c2oTgxzwiZ1II',
  },
  {
    name: 'Lisa Smith',
    time: '5h ago',
    text: 'Incredible depth as always. Your work is a staple in my morning routine.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxRcUg7OznNmGlhBZ2ZJ95Z3Cmvp4nqmsuX4r2u8LCaObzuLPGybeb128NTnE0-34VNLtQJUvpRCwRwqFUELPgyuDZNTnxr2PlZOFqmZT06zNfwDX5SkqKw_GjCG59Peyc825U_Q06pPS4I6ZcMPGiv9caEXwKSdgcYyg0_RsLeOluwOqt03IRis89NFDDzTVrZm74HVt4UZSDg4KcbqdH9ZiXcKbm6zaODYXAbePDYbTgD9uhefxayCGuecpG0LR_JjPdyM9UR7s',
  },
]

export const authorQuickActions = [
  { label: 'Drafts Waiting Review', value: '07', icon: Clock3 },
  { label: 'New Comments', value: '12', icon: MessageSquare },
  { label: 'Ideas in Backlog', value: '19', icon: Sparkles },
]
