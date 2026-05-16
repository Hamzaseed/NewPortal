import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settings/settingSlice";
import authorSettingReducer from "./settings/authorSettingSlice";
import categoriesReducer from "./categories/categoriesSlice";
import articlesReducer from "./articles/articleSlice";
import analyticsReducer from "./analytics/analyticSlice";
import analyticsEventsReducer from "./analytics/analyticsEventsSlice";
import authorAnalyticsReducer from "./analytics/authorAnalyticSlice";
import commentsReducer from "./comments/commentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import authorDashboardReducer from "./Dashboard/authordashboardSlice";
import videosReducer from "./videos/videoSlice";
import advertisingReducer from "./advertising/advertisingSlice";

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    authorSettings: authorSettingReducer,
    categories: categoriesReducer,
    articles: articlesReducer,
    adminAnalytics: analyticsReducer,
    analyticsEvents: analyticsEventsReducer,
    authorAnalytics: authorAnalyticsReducer,
    comments: commentsReducer,
    adminDashboard: dashboardReducer,
    authorDashboard: authorDashboardReducer,
    videos: videosReducer,
    advertising: advertisingReducer,
  },
}); 

export default store;
