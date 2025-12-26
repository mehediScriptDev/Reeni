import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from './context/AuthContext';
import App from './App';

const ProtectedApp: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true, state: { from: location.pathname + location.search } });
    }
  }, [loading, user, navigate, location]);

  // Render App immediately with optional loading overlay
  return (
    <>
      <App />
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-6 py-4 text-sm text-gray-700">লোড হচ্ছে…</div>
        </div>
      )}
    </>
  );
};

export default ProtectedApp;
