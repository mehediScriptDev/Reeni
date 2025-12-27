import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const Auth: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const { signIn, signUp, signInWithGoogle, resetPassword, loading, user } = useAuth();
  const navigate = useNavigate();
  // Always redirect to Dashboard after login
  const from = '/';

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [loading, user, from, navigate]);

  const handleGoogle = async () => {
    try {
      setError(null);
      setBusy(true);
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'গুগল সাইনইনে ত্রুটি');
    } finally {
      setBusy(false);
    }
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setBusy(true);
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'লগইনে ত্রুটি');
    } finally {
      setBusy(false);
    }
  };

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('নাম দিন');
      return;
    }
    if (password !== confirm) {
      setError('পাসওয়ার্ড মিলছে না');
      return;
    }
    try {
      setError(null);
      setBusy(true);
      await signUp(email, password);
      // Save name and phone to localStorage (Firebase doesn't store these by default)
      const userProfile = { name: name.trim(), phone: phone.trim(), email };
      localStorage.setItem('reeni_user_profile', JSON.stringify(userProfile));
      // Show verification message instead of immediate redirect
      const { default: Swal } = await import('sweetalert2');
      await Swal.fire({
        title: 'ইমেইল ভেরিফিকেশন',
        text: 'আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠানো হয়েছে। লিংকে ক্লিক করে ইমেইল ভেরিফাই করুন।',
        icon: 'info',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#1976D2',
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'রেজিস্ট্রেশনে ত্রুটি');
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      setError('ইমেইল দিন');
      return;
    }
    try {
      setError(null);
      setBusy(true);
      await resetPassword(email);
      setError('পাসওয়ার্ড রিসেট মেইল পাঠানো হয়েছে');
    } catch (err: any) {
      setError(err?.message || 'রিসেটে ত্রুটি');
    } finally {
      setBusy(false);
    }
  };

  // Remove the text-only loading screen; let the initial splash or skeletons handle loading
  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-md shadow">
        <div className="flex items-center justify-center ">
          <img src="/fav.png" alt="Reeni" className="w-12 h-12" />
          <h1 className="text-2xl font-semibold">Reeni</h1>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-8 border-b border-gray-200">
            <button
              onClick={() => setTab('login')}
              className={`pb-2 px-4 text-base font-medium ${tab === 'login' ? 'text-gray-800 border-b-2 border-[#1976D2]' : 'text-gray-500'}`}
            >
              লগইন
            </button>
            <button
              onClick={() => setTab('register')}
              className={`pb-2 px-4 text-base font-medium ${tab === 'register' ? 'text-gray-800 border-b-2 border-[#1976D2]' : 'text-gray-500'}`}
            >
              রেজিস্ট্রেশন
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={submitLogin} className="mt-6 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="ইমেইল"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <button className="w-full bg-[#1976D2] text-white py-3 rounded-md text-sm font-medium hover:bg-[#1565C0] disabled:opacity-60" disabled={busy}>লগইন</button>

              <div className="text-center text-sm text-[#1976D2] cursor-pointer hover:underline" onClick={handleReset}>পাসওয়ার্ড ভুলে গেছেন?</div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <div className="text-xs text-gray-500 font-medium">OR</div>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <button
                type="button"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md flex items-center justify-center gap-2 text-sm hover:bg-gray-50 disabled:opacity-60"
                onClick={handleGoogle}
                disabled={busy}
              >
                <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h147.4c-6.4 34.7-25 64.1-53.3 83.8v69.6h86.1c50.3-46.4 79.3-114.6 79.3-198.3z"/>
                  <path fill="#34a853" d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-86.1-69.6c-24 16.1-54.6 25.6-92 25.6-70.8 0-130.8-47.9-152.3-112.2H31.1v70.7C75.1 483.1 168 544.3 272 544.3z"/>
                  <path fill="#fbbc04" d="M119.7 325.1c-8.9-26.6-8.9-55.1 0-81.7V172.7H31.1c-33.6 66.6-33.6 145.3 0 211.9l88.6-59.5z"/>
                  <path fill="#ea4335" d="M272 107.6c39.5 0 75.1 13.6 103.1 40.4l77.3-77.3C405.3 24.2 345.9 0 272 0 168 0 75.1 61.2 31.1 153.4l88.6 59.5C141.2 155.5 201.2 107.6 272 107.6z"/>
                </svg>
                গুগল দিয়ে চালিয়ে যান
              </button>

              
            </form>
          ) : (
            <form onSubmit={submitRegister} className="mt-6 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="নাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="ফোন নম্বর"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="ইমেইল"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent"
                />
              </div>

              <button className="w-full bg-[#1976D2] text-white py-3 rounded-md text-sm font-medium hover:bg-[#1565C0] disabled:opacity-60" disabled={busy}>রেজিস্টার</button>

             
            </form>
          )}
        </div>
        {error && <div className="mt-4 text-sm text-center text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default Auth;
