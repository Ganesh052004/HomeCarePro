import { useApp } from '../context/AppContext';
import { Menu, X, Sun, Moon, Bell, User, ChevronDown, LogOut, LayoutDashboard, ShoppingBag, Car } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { currentPage, navigate, currentUser, logout, darkMode, toggleDarkMode, notifications } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = currentUser ? notifications.filter(n => n.userId === currentUser.id && !n.isRead).length : 0;
  const userNotifs = currentUser ? notifications.filter(n => n.userId === currentUser.id).slice(0, 5) : [];

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Vehicle Pickup', page: 'vehicle-service' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 group-hover:scale-110 transition-transform">HC</div>
            <span className="text-xl font-bold text-gradient hidden sm:block">HomeCare<span className="text-indigo-500">Pro</span></span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.page} onClick={() => navigate(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}>
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Dark Mode */}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <>
                {/* Notifications */}
                <div ref={notifRef} className="relative">
                  <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{unreadCount}</span>}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-slide-down">
                      <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {userNotifs.length === 0 ? (
                          <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
                        ) : userNotifs.map(n => (
                          <div key={n.id} className={`p-3 border-b border-gray-50 dark:border-slate-700 ${!n.isRead ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div ref={userMenuRef} className="relative">
                  <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-lg">{currentUser.avatar}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {userMenu && (
                    <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-slide-down">
                      <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                      </div>
                      <div className="p-2">
                        {currentUser.role === 'user' && (
                          <button onClick={() => { navigate('user-dashboard'); setUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                            <User className="w-4 h-4" /> Dashboard
                          </button>
                        )}
                        {currentUser.role === 'admin' && (
                          <button onClick={() => { navigate('admin-dashboard'); setUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                            <LayoutDashboard className="w-4 h-4" /> Admin Panel
                          </button>
                        )}
                        {currentUser.role === 'worker' && (
                          <button onClick={() => { navigate('worker-dashboard'); setUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                            <ShoppingBag className="w-4 h-4" /> Worker Panel
                          </button>
                        )}
                        <button onClick={() => { navigate('user-bookings'); setUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                          <ShoppingBag className="w-4 h-4" /> My Bookings
                        </button>
                        <button onClick={() => { navigate('vehicle-tracking'); setUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                          <Car className="w-4 h-4" /> Vehicle Tracking
                        </button>
                      </div>
                      <div className="p-2 border-t border-gray-100 dark:border-slate-700">
                        <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('login')} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Login</button>
                <button onClick={() => navigate('register')} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all">Sign Up</button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 dark:border-slate-700 animate-slide-down">
            <div className="pt-3 space-y-1">
              {navItems.map(item => (
                <button key={item.page} onClick={() => { navigate(item.page); setMobileOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === item.page ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
