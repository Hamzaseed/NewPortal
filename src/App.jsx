import { Toaster } from 'sonner'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import RequireRole from './components/auth/RequireRole'
import AdminAdvertisingPage from './pages/AdminAdvertisingPage'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage'
import AdminAnalyticsCategoriesPage from './pages/AdminAnalyticsCategoriesPage'
import AdminArticleCreatePage from './pages/AdminArticleCreatePage'
import AdminArticlesPage from './pages/AdminArticlesPage'
import AdminAuthorsPage from './pages/AdminAuthorsPage'
import AdminCategoriesPage from './pages/AdminCategoriesPage'
import AdminCommentsPage from './pages/AdminCommentsPage'
import AdminCmsPage from './pages/AdminCmsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLayout from './pages/AdminLayout'
import AdminMarketsPage from './pages/AdminMarketsPage'
import AdminPermissionsPage from './pages/AdminPermissionsPage'
import AdminSettingsPage from './pages/AdminSettingsPage'
import AdminSubscriptionPackagesPage from './pages/AdminSubscriptionPackagesPage'
import AdminSubscribersPage from './pages/AdminSubscribersPage'
import AdminVideoCreatePage from './pages/AdminVideoCreatePage'
import AdminVideosPage from './pages/AdminVideosPage'
import ArticlePage from './pages/ArticlePage'
import AuthorArticleCreatePage from './pages/author/AuthorArticleCreatePage'
import AuthorArticlesPage from './pages/author/AuthorArticlesPage'
import AuthorDashboardPage from './pages/author/AuthorDashboardPage'
import AuthorAnalyticsPage from './pages/author/AuthorAnalyticsPage'
import AuthorEarningsPage from './pages/author/AuthorEarningsPage'
import AuthorSettingsPage from './pages/author/AuthorSettingsPage'
import AuthorVideoCreatePage from './pages/author/AuthorVideoCreatePage'
import CategoryPage from './pages/CategoryPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import MarketsPage from './pages/MarketsPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SavedPage from './pages/SavedPage'
import SubscriptionCartPage from './pages/SubscriptionCartPage'
import SubscriptionPackagesPage from './pages/SubscriptionPackagesPage'
import VideosPage from './pages/VideosPage'
import VideoWatchPage from './pages/VideoWatchPage'
import SettingsHeadSync from './components/layout/SettingsHeadSync'

function App() {
  return (
    <HelmetProvider>
      <>
        <SettingsHeadSync />
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          <Route element={<RequireRole role="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="markets" element={<AdminMarketsPage />} />
              <Route path="articles" element={<AdminArticlesPage />} />
              <Route path="articles/new" element={<AdminArticleCreatePage />} />
              <Route path="articles/:id/edit" element={<AdminArticleCreatePage />} />
              <Route path="videos" element={<AdminVideosPage />} />
              <Route path="videos/new" element={<AdminVideoCreatePage />} />
              <Route path="videos/:id/edit" element={<AdminVideoCreatePage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="authors" element={<AdminAuthorsPage />} />
              <Route path="advertising" element={<AdminAdvertisingPage />} />
              <Route path="subscribers" element={<AdminSubscribersPage />} />
              <Route path="subscription-packages" element={<AdminSubscriptionPackagesPage />} />
              <Route path="comments" element={<AdminCommentsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="analytics/categories" element={<AdminAnalyticsCategoriesPage />} />
              <Route path="cms" element={<AdminCmsPage />} />
              <Route path="permissions" element={<AdminPermissionsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          <Route element={<RequireRole role="author" />}>
            <Route path="/author/dashboard" element={<AuthorDashboardPage />} />
            <Route path="/author/articles" element={<AuthorArticlesPage />} />
            <Route path="/author/articles/new" element={<AuthorArticleCreatePage />} />
            <Route path="/author/articles/:id/edit" element={<AuthorArticleCreatePage />} />
            <Route path="/author/videos/new" element={<AuthorVideoCreatePage />} />
            <Route path="/author/analytics" element={<AuthorAnalyticsPage />} />
            <Route path="/author/earnings" element={<AuthorEarningsPage />} />
            <Route path="/author/settings" element={<AuthorSettingsPage />} />
          </Route>
          <Route path="/newsroom" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:slug" element={<VideoWatchPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/news/:slug" element={<ArticlePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/subscriptions" element={<SubscriptionPackagesPage />} />
          <Route path="/subscription-cart" element={<SubscriptionCartPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </>
    </HelmetProvider>
  )
}

export default App
