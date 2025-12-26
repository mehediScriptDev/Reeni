import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from './context/AuthContext';
import App from './App';

const ProtectedApp: React.FC = () => {
  const { user, loading, sendVerificationEmail, signOutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true, state: { from: location.pathname + location.search } });
    }
  }, [loading, user, navigate, location]);

  const handleResend = async () => {
    setResending(true);
    try {
      await sendVerificationEmail();
      setResent(true);
    } catch {
      // ignore
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/login', { replace: true });
  };

  // Show email verification required screen
  if (!loading && user && !user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-semibold text-gray-800">ইমেইল ভেরিফাই করুন</h2>
          <p className="mt-2 text-gray-600">
            আপনার ইমেইল <strong>{user.email}</strong> এ একটি ভেরিফিকেশন লিংক পাঠানো হয়েছে। 
            লিংকে ক্লিক করে ইমেইল ভেরিফাই করুন, তারপর এই পেজ রিফ্রেশ করুন।
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-[#1976D2] text-white rounded hover:bg-[#1565C0]"
            >
              আমি ভেরিফাই করেছি - রিফ্রেশ করুন
            </button>
            <button
              onClick={handleResend}
              disabled={resending || resent}
              className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              {resent ? 'লিংক পাঠানো হয়েছে ✓' : resending ? 'পাঠানো হচ্ছে...' : 'আবার লিংক পাঠান'}
            </button>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-red-600 hover:underline text-sm"
            >
              অন্য অ্যাকাউন্ট দিয়ে লগইন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

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
