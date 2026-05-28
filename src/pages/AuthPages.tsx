import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, ArrowLeft, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (!result.success) setError(result.message);
  };

  const quickLogins = [
    { label: 'Admin', email: 'admin@homecare.com', password: 'admin123', icon: '👨‍💼' },
    { label: 'Worker', email: 'worker@homecare.com', password: 'worker123', icon: '👷' },
    { label: 'User', email: 'user@homecare.com', password: 'user123', icon: '👩' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-cyan-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-8xl animate-float">🏠</div>
          <div className="absolute bottom-20 right-20 text-8xl animate-float" style={{ animationDelay: '1s' }}>🚗</div>
          <div className="absolute top-1/2 left-1/3 text-6xl animate-float" style={{ animationDelay: '2s' }}>🔧</div>
        </div>
        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <span className="text-4xl font-bold">HC</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to HomeCare Pro</h1>
          <p className="text-lg text-indigo-100 max-w-md">India's most trusted platform for home services, vehicle care, and appliance repair.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{ icon: '50K+', label: 'Customers' }, { icon: '500+', label: 'Workers' }, { icon: '15+', label: 'Cities' }].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{s.icon}</p>
                <p className="text-xs text-indigo-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back 👋</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500" /> Remember me
              </label>
              <button type="button" onClick={() => navigate('forgot-password')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Forgot Password?</button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Login */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-3">
              {quickLogins.map(q => (
                <button key={q.label} onClick={() => { setEmail(q.email); setPassword(q.password); }}
                  className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                  <span className="text-xl">{q.icon}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
            Don't have an account? <button onClick={() => navigate('register')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==================== REGISTER PAGE ==================== */
export function RegisterPage() {
  const { register, navigate } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', address: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register(form);
    setLoading(false);
    if (!result.success) setError(result.message);
    else setStep(2);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful! 🎉</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Your account has been created. An OTP has been sent to your email for verification.</p>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl mb-6">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">For demo purposes, your account is auto-verified.</p>
          </div>
          <button onClick={() => navigate('home')} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account ✨</h2>
          <p className="text-gray-600 dark:text-gray-400">Join HomeCare Pro for professional services</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter your full name" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter your email" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter phone number" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Create a password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required rows={2}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                placeholder="Enter your address" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-60">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account? <button onClick={() => navigate('login')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
}

/* ==================== FORGOT PASSWORD ==================== */
export function ForgotPasswordPage() {
  const { navigate, toast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
    toast('Password reset OTP sent to your email', 'success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('login')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 animate-scale-in">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Reset Password</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-8">Enter your email to receive a password reset OTP</p>

          {!sent ? (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Enter your email" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-60">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-emerald-700 dark:text-emerald-400">OTP sent to {email}</p>
              </div>
              <p className="text-sm text-gray-500">For demo, you can use OTP: <span className="font-mono font-bold text-indigo-600">123456</span></p>
              <button onClick={() => { navigate('login'); toast('Password reset successful!', 'success'); }}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Verify & Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==================== OTP VERIFICATION ==================== */
export function OTPPage() {
  const { navigate } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 text-center animate-scale-in">
          <Sparkles className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enter OTP</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">We've sent a 6-digit OTP to your email</p>

          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, i) => (
              <input key={i} id={`otp-${i}`} maxLength={1} value={digit}
                onChange={e => handleChange(i, e.target.value)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                type="text" />
            ))}
          </div>

          <button onClick={handleVerify} disabled={loading || otp.some(d => !d)}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-60">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button onClick={() => navigate('login')} className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
