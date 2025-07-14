import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { NotificationProvider } from '../contexts/NotificationContext';

// Lazy load pages for better performance
const Home = React.lazy(() => import('../pages/Home/Home').then(module => ({ default: module.Home })));
const Catalog = React.lazy(() => import('../pages/Catalog/Catalog').then(module => ({ default: module.Catalog })));
const BestSellers = React.lazy(() => import('../pages/BestSellers/BestSellers').then(module => ({ default: module.BestSellers })));
const TopRated = React.lazy(() => import('../pages/TopRated/TopRated').then(module => ({ default: module.TopRated })));
const GameDetails = React.lazy(() => import('../pages/GameDetails/GameDetails').then(module => ({ default: module.GameDetails })));
const Login = React.lazy(() => import('../pages/Login/Login').then(module => ({ default: module.Login })));
const Register = React.lazy(() => import('../pages/Register/Register').then(module => ({ default: module.Register })));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword/ResetPassword').then(module => ({ default: module.ResetPassword })));
const VerifyEmail = React.lazy(() => import('../pages/VerifyEmail/VerifyEmail').then(module => ({ default: module.VerifyEmail })));
const Cart = React.lazy(() => import('../pages/Cart/Cart').then(module => ({ default: module.Cart })));
const Settings = React.lazy(() => import('../pages/Settings/Settings').then(module => ({ default: module.Settings })));
const Review = React.lazy(() => import('../pages/Review/Review').then(module => ({ default: module.Review })));

// Admin pages
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <span>Loading...</span>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/best-sellers" element={<BestSellers />} />
                    <Route path="/top-rated" element={<TopRated />} />
                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />

                    {/* Protected Routes */}
                    <Route 
                      path="/cart" 
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/settings" 
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/review/:id" 
                      element={
                        <ProtectedRoute>
                          <Review />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Admin Routes */}
                    <Route 
                      path="/admin/*" 
                      element={
                        <AdminRoute>
                          <Routes>
                            <Route path="dashboard" element={<AdminDashboard />} />
                          </Routes>
                        </AdminRoute>
                      } 
                    />

                    {/* 404 Route */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Suspense>
              </Layout>
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // For frontend testing, we'll allow direct access to admin routes
  return <>{children}</>;
}; 