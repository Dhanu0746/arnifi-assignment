import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobsPage from './features/jobs/JobsPage';
import AppliedJobsPage from './features/applications/AppliedJobsPage';
import AdminDashboard from './features/admin/AdminDashboard';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/jobs" />;
  return children;
}

function GuestRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/jobs'} />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />

      {/* These will be filled as we build each page */}
      <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
      <Route path="/applied" element={<ProtectedRoute><AppliedJobsPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;