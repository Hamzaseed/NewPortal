export const adminNavItems = [
  { label: 'Dashboard', key: 'dashboard', path: '/admin/dashboard' },
  { label: 'CMS', key: 'newspaper', path: '/admin/cms' },
  { label: 'Markets', key: 'trending_up', path: '/admin/markets' },
  { label: 'Articles', key: 'article', path: '/admin/articles' },
  { label: 'Categories', key: 'category', path: '/admin/categories' },
  { label: 'Authors', key: 'person_edit', path: '/admin/authors' },
  { label: 'Advertising', key: 'campaign', path: '/admin/advertising' },
  { label: 'Subscribers', key: 'group', path: '/admin/subscribers' },
  { label: 'Comments', key: 'chat_bubble', path: '/admin/comments' },
  { label: 'Analytics', key: 'trending_up', path: '/admin/analytics' },
]

export const adminStats = [
  { title: 'Total Articles', value: '1,240', delta: '+12%', deltaType: 'up', icon: 'article' },
  { title: "Today's Hits", value: '45,210', delta: '+5.2%', deltaType: 'up', icon: 'visibility' },
  { title: 'New Subscribers', value: '120', delta: '+8%', deltaType: 'up', icon: 'loyalty' },
  { title: 'Active Authors', value: '18', delta: 'Stable', deltaType: 'flat', icon: 'edit_note' },
]

export const categoryPerformance = [
  {
    rank: 1,
    name: 'Politics',
    percent: 42,
    views: '12.4k views',
    trend: 'up',
    growth: '+14.2%',
    engagement: '6m 10s avg. read',
    articles: 128,
    standout: 'Election coverage and policy explainers kept weekend traffic elevated.',
    audience: 'Returning readers',
  },
  {
    rank: 2,
    name: 'Technology',
    percent: 28,
    views: '7.8k views',
    trend: 'up',
    growth: '+9.1%',
    engagement: '5m 02s avg. read',
    articles: 84,
    standout: 'AI and product launch coverage is converting newsletter readers well.',
    audience: 'Search traffic',
  },
  {
    rank: 3,
    name: 'Economy',
    percent: 18,
    views: '5.4k views',
    trend: 'flat',
    growth: '+0.8%',
    engagement: '4m 26s avg. read',
    articles: 65,
    standout: 'Market explainers are steady, but headline urgency is softening mid-week.',
    audience: 'Direct traffic',
  },
  {
    rank: 4,
    name: 'Culture',
    percent: 12,
    views: '3.1k views',
    trend: 'down',
    growth: '-5.4%',
    engagement: '3m 18s avg. read',
    articles: 41,
    standout: 'Feature depth is strong, but recirculation drops after the first article.',
    audience: 'Social traffic',
  },
]

export const analyticsArticles = [
  {
    title: 'The Shift in Global Markets: A Detailed Analysis',
    published: 'Published 2 days ago',
    author: 'Elena Rossi',
    views: '12,482',
    avgTime: '05:12',
    bounce: '18%',
    bounceClass: 'text-green-500',
    status: 'Trending',
    statusClass: 'bg-green-100 text-green-700',
  },
  {
    title: 'Sustainable Cities: Urban Planning for 2050',
    published: 'Published 5 days ago',
    author: 'Marcus Chen',
    views: '8,102',
    avgTime: '03:45',
    bounce: '24%',
    bounceClass: 'text-slate-700',
    status: 'Stable',
    statusClass: 'bg-slate-100 text-slate-600',
  },
  {
    title: 'Interview: The New Age of Digital Journalism',
    published: 'Published 1 week ago',
    author: 'Sarah Jenkins',
    views: '6,541',
    avgTime: '08:22',
    bounce: '12%',
    bounceClass: 'text-green-500',
    status: 'Viral',
    statusClass: 'bg-green-100 text-green-700',
  },
  {
    title: 'Artificial Intelligence in the Healthcare Sector',
    published: 'Published 3 days ago',
    author: 'David Miller',
    views: '5,820',
    avgTime: '02:30',
    bounce: '45%',
    bounceClass: 'text-red-500',
    status: 'Low Engage',
    statusClass: 'bg-red-100 text-red-700',
  },
]

export const recentArticles = [
  {
    title: 'Global Summit Addresses Urgent Climate Action Plans',
    slug: 'climate-summit-2024',
    author: 'Sarah Jenkins',
    authorImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoO0OHZ7nANyNggVbdCx2sOqy9H0mbhz3C5goK0FX2CGbcOaqexlA__RboKVvNYL-7RlUt-HVVCMHAH8BNlZUhNRRyBFMyeO__AcoKbBw8hg1CCw301kC5X2eFg0mGtN5KqZjsk3yLYOSK2iaGjU87NS4NowPMtaLcdXCdcON2uS94HtjMWfQFDqd4ZRNNJjDT-GI_fhtTwyer7Xnh31ql1Too0Hcb1pEdGwS1X6Pn8cZZRRAz92k1zRi7rfUqLc3Q9kwP9jzGGmM',
    category: 'Politics',
    status: 'Published',
    date: 'Oct 24, 2023',
  },
  {
    title: 'How Generative AI is Reshaping Modern Workplaces',
    slug: 'ai-workplace-impact',
    author: 'Michael Chen',
    authorImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkBNEUscbcssQxZ6U9TVuLOHSoEKrq8fLJxzkskbflKkTq817z1FLM8L3-L25yGRYHUbCEprZhe15mgrvq2rD5_Di1jUUAlRQx0YrSQWv_ShCGK2ysEBETHUQkWg4QWEMsXFoLmQNPmSpYyoQxVAVhCC9bCnOQNL0vAJLBk1yMULIXuR6OkXYxYb2GJlGbCdOcJyJgwgNejquMFnMk_smy1V4vKzACS0fsfp-x5gPbZou0VBYqx89BXfYgaZBF5c7vEO41UR4eRBY',
    category: 'Technology',
    status: 'Draft',
    date: 'Oct 25, 2023',
  },
  {
    title: 'Economic Indicators Suggest Slow Recovery in Q4',
    slug: 'q4-economic-indicators',
    author: 'Elena Rodriguez',
    authorImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPQuFmyKmIiD2LKtPLd7BgdPgA9vZgZXrpmnwWk75QCObMKB5us_klTLea1m9oNPbUlu2HEm-3mS6uEUFIJgy_Q9YpWDAZXjjS_qQoYLWj4zje_OLXbHW7C0hkgCIs-kppDNhJ5wDycEqYLO_pkhGsILVl2aVn5dxi3nV_ArtTpnAFDXy6tannvo67FXxixNxyg4uEzQmf5StFGEDvbX3cJN0AmxU-z1ZcoSxJxbApTKJOCyq0MQv1ccYXMEgvy4YWqDwlBr2oIiY',
    category: 'Economy',
    status: 'Scheduled',
    date: 'Oct 26, 2023',
  },
]

export const profile = {
  name: 'James Miller',
  role: 'Editor in Chief',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmNNPkTK9Tz5rl0xniFZ48S9kxnVj2aEXE6iDPS0X7Phbkb5cCVyxY2CkaqFfdpd8R46Q3F8KehDJK8pYGWQ72ZuWaiCmmNyBSIxXVNaEhEO2VfjFx_hfcqZzKyhG95-lBvuehI0DR5upRPv9bzjv3TT-jV2n0I0YPEKliRVCV0r66oWlrOHiNF-D5rXEkZ-0VYkbkIIwGAwb3eAb7wrEk94khwABu9gU5PMauQ6I2bvw2FuxO-dq7f3GfSOx5LdoKF1T1-mcLjw',
}
