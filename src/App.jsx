import { Toaster } from 'sonner'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminAdvertisingPage from './pages/AdminAdvertisingPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'
import AdminArticleCreatePage from './pages/AdminArticleCreatePage'
import AdminArticlesPage from './pages/AdminArticlesPage'
import AdminAuthorsPage from './pages/AdminAuthorsPage'
import AdminCategoriesPage from './pages/AdminCategoriesPage'
import AdminCommentsPage from './pages/AdminCommentsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLayout from './pages/AdminLayout'
import AdminPermissionsPage from './pages/AdminPermissionsPage'
import AdminSettingsPage from './pages/AdminSettingsPage'
import AdminSubscribersPage from './pages/AdminSubscribersPage'
import ArticlePage from './pages/ArticlePage'
import AuthorArticleCreatePage from './pages/author/AuthorArticleCreatePage'
import AuthorArticlesPage from './pages/author/AuthorArticlesPage'
import AuthorDashboardPage from './pages/author/AuthorDashboardPage'
import AuthorAnalyticsPage from './pages/author/AuthorAnalyticsPage'
import AuthorSettingsPage from './pages/author/AuthorSettingsPage'
import CategoryPage from './pages/CategoryPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import MarketsPage from './pages/MarketsPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SavedPage from './pages/SavedPage'
import VideosPage from './pages/VideosPage'
import VideoWatchPage from './pages/VideoWatchPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="articles/new" element={<AdminArticleCreatePage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="authors" element={<AdminAuthorsPage />} />
          <Route path="advertising" element={<AdminAdvertisingPage />} />
          <Route path="subscribers" element={<AdminSubscribersPage />} />
          <Route path="comments" element={<AdminCommentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="permissions" element={<AdminPermissionsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="/author/dashboard" element={<AuthorDashboardPage />} />
        <Route path="/author/articles" element={<AuthorArticlesPage />} />
        <Route path="/author/articles/new" element={<AuthorArticleCreatePage />} />
        <Route path="/author/analytics" element={<AuthorAnalyticsPage />} />
        <Route path="/author/settings" element={<AuthorSettingsPage />} />
        <Route path="/newsroom" element={<HomePage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos/:slug" element={<VideoWatchPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>

      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
