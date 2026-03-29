import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const HomePage = lazy(() => import('../pages/client/Home').then((module) => ({ default: module.HomePage })));
const CatalogPage = lazy(() => import('../pages/client/Catalog').then((module) => ({ default: module.CatalogPage })));
const CourseDetailPage = lazy(() => import('../pages/client/CourseDetail').then((module) => ({ default: module.CourseDetailPage })));
const PlayerPage = lazy(() => import('../pages/client/Player').then((module) => ({ default: module.PlayerPage })));
const MyLearningPage = lazy(() => import('../pages/client/MyLearning').then((module) => ({ default: module.MyLearningPage })));
const CartPage = lazy(() => import('../pages/client/Cart').then((module) => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('../pages/client/Checkout').then((module) => ({ default: module.CheckoutPage })));
const LoginPage = lazy(() => import('../pages/client/Login').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('../pages/client/Register').then((module) => ({ default: module.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/client/ForgotPassword').then((module) => ({ default: module.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('../pages/client/ResetPassword').then((module) => ({ default: module.ResetPasswordPage })));

const AdminLoginPage = lazy(() => import('../pages/admin/AdminLogin').then((module) => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboardPage })));
const AdminStudentsPage = lazy(() => import('../pages/admin/Students').then((module) => ({ default: module.AdminStudentsPage })));
const AdminInstructorsPage = lazy(() => import('../pages/admin/Instructors').then((module) => ({ default: module.AdminInstructorsPage })));
const AdminCoursesPage = lazy(() => import('../pages/admin/Courses').then((module) => ({ default: module.AdminCoursesPage })));
const AdminApprovalsPage = lazy(() => import('../pages/admin/Approvals').then((module) => ({ default: module.AdminApprovalsPage })));
const AdminRevenuePage = lazy(() => import('../pages/admin/Revenue').then((module) => ({ default: module.AdminRevenuePage })));
const AdminPayoutsPage = lazy(() => import('../pages/admin/Payouts').then((module) => ({ default: module.AdminPayoutsPage })));
const AdminCouponsPage = lazy(() => import('../pages/admin/Coupons').then((module) => ({ default: module.AdminCouponsPage })));
const AdminSettingsPage = lazy(() => import('../pages/admin/Settings').then((module) => ({ default: module.AdminSettingsPage })));
const AdminRolesPage = lazy(() => import('../pages/admin/Roles').then((module) => ({ default: module.AdminRolesPage })));
const AdminAuditLogsPage = lazy(() => import('../pages/admin/AuditLogs').then((module) => ({ default: module.AdminAuditLogsPage })));

const InstructorLoginPage = lazy(() => import('../pages/instructor/InstructorLogin').then((module) => ({ default: module.InstructorLoginPage })));
const InstructorOverviewPage = lazy(() => import('../pages/instructor/Overview').then((module) => ({ default: module.InstructorOverviewPage })));
const InstructorCoursesPage = lazy(() => import('../pages/instructor/MyCourses').then((module) => ({ default: module.InstructorCoursesPage })));
const InstructorCourseBuilderPage = lazy(() => import('../pages/instructor/CourseBuilder').then((module) => ({ default: module.InstructorCourseBuilderPage })));
const InstructorStudentsPage = lazy(() => import('../pages/instructor/Students').then((module) => ({ default: module.InstructorStudentsPage })));
const InstructorQnAPage = lazy(() => import('../pages/instructor/QnA').then((module) => ({ default: module.InstructorQnAPage })));
const InstructorReviewsPage = lazy(() => import('../pages/instructor/Reviews').then((module) => ({ default: module.InstructorReviewsPage })));
const InstructorRevenuePage = lazy(() => import('../pages/instructor/Revenue').then((module) => ({ default: module.InstructorRevenuePage })));
const InstructorProfilePage = lazy(() => import('../pages/instructor/Profile').then((module) => ({ default: module.InstructorProfilePage })));
const InstructorAnnouncementsPage = lazy(() => import('../pages/instructor/Announcements').then((module) => ({ default: module.InstructorAnnouncementsPage })));
const InstructorNotificationsPage = lazy(() => import('../pages/instructor/Notifications').then((module) => ({ default: module.InstructorNotificationsPage })));

const NotFoundPage = lazy(() => import('../pages/common/NotFound').then((module) => ({ default: module.NotFoundPage })));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CatalogPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute role="student" /> }>
          <Route path="/dashboard/student" element={<MyLearningPage />} />
          <Route path="/learn/:courseId/:lessonId" element={<PlayerPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute role="admin" redirectTo="/admin/login" /> }>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/students" element={<AdminStudentsPage />} />
          <Route path="/admin/instructors" element={<AdminInstructorsPage />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
          <Route path="/admin/revenue" element={<AdminRevenuePage />} />
          <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
          <Route path="/admin/coupons" element={<AdminCouponsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/roles" element={<AdminRolesPage />} />
          <Route path="/admin/logs" element={<AdminAuditLogsPage />} />
        </Route>

        <Route path="/instructor/login" element={<InstructorLoginPage />} />
        <Route element={<ProtectedRoute role="instructor" redirectTo="/instructor/login" /> }>
          <Route path="/instructor/overview" element={<InstructorOverviewPage />} />
          <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
          <Route path="/instructor/courses/new" element={<InstructorCourseBuilderPage />} />
          <Route path="/instructor/courses/:id/edit" element={<InstructorCourseBuilderPage />} />
          <Route path="/instructor/students" element={<InstructorStudentsPage />} />
          <Route path="/instructor/qa" element={<InstructorQnAPage />} />
          <Route path="/instructor/reviews" element={<InstructorReviewsPage />} />
          <Route path="/instructor/revenue" element={<InstructorRevenuePage />} />
          <Route path="/instructor/profile" element={<InstructorProfilePage />} />
          <Route path="/instructor/announcements" element={<InstructorAnnouncementsPage />} />
          <Route path="/instructor/notifications" element={<InstructorNotificationsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
