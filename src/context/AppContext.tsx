import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, Service, ServiceCategory, Booking, VehicleBooking, Review, ContactMessage, Notification, Worker, Coupon, Payment } from '../types';
import { getInitialData, saveData, generateId, StoreData } from '../data/mockData';

interface AppContextType {
  // Data
  users: User[];
  services: Service[];
  categories: ServiceCategory[];
  bookings: Booking[];
  vehicleBookings: VehicleBooking[];
  reviews: Review[];
  contactMessages: ContactMessage[];
  notifications: Notification[];
  workers: Worker[];
  coupons: Coupon[];
  payments: Payment[];

  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (data: { name: string; email: string; phone: string; password: string; address: string }) => { success: boolean; message: string };
  logout: () => void;
  updateUser: (id: string, data: Partial<User>) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  deleteUser: (id: string) => void;

  // Navigation
  currentPage: string;
  navigate: (page: string, data?: Record<string, string>) => void;
  pageData: Record<string, string>;

  // Actions
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => string;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  createVehicleBooking: (booking: Omit<VehicleBooking, 'id' | 'createdAt' | 'timeline'>) => string;
  updateVehicleBooking: (id: string, data: Partial<VehicleBooking>) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  addWorker: (worker: Omit<Worker, 'id' | 'totalJobs' | 'completedJobs' | 'earnings'>) => void;
  updateWorker: (id: string, data: Partial<Worker>) => void;
  addService: (service: Service) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, data: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  applyCoupon: (code: string, amount: number) => { success: boolean; discount: number; message: string };
  addPayment: (payment: Omit<Payment, 'id'>) => void;

  // UI
  darkMode: boolean;
  toggleDarkMode: () => void;
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(() => getInitialData());
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('homecare_currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<Record<string, string>>({});
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('homecare_darkMode') === 'true';
  });
  const [toastState, setToastState] = useState<{ message: string; type: string } | null>(null);

  // Persist data
  useEffect(() => { saveData(data); }, [data]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('homecare_currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('homecare_currentUser');
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem('homecare_darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastState({ message, type });
    setTimeout(() => setToastState(null), 3000);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    if (user.isBlocked) return { success: false, message: 'Your account has been blocked. Contact admin.' };
    setCurrentUser(user);
    toast(`Welcome back, ${user.name}!`, 'success');
    if (user.role === 'admin') setCurrentPage('admin-dashboard');
    else if (user.role === 'worker') setCurrentPage('worker-dashboard');
    else setCurrentPage('home');
    return { success: true, message: 'Login successful' };
  }, [data.users, toast]);

  const register = useCallback((userData: { name: string; email: string; phone: string; password: string; address: string }) => {
    if (data.users.find(u => u.email === userData.email)) return { success: false, message: 'Email already registered' };
    const newUser: User = {
      id: generateId('user'),
      ...userData,
      role: 'user',
      avatar: '👤',
      isBlocked: false,
      createdAt: new Date().toISOString().split('T')[0],
      favoriteServices: [],
      referralCode: 'HC' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    };
    setData(prev => ({ ...prev, users: [...prev.users, newUser] }));
    setCurrentUser(newUser);
    toast('Registration successful! Welcome to HomeCare Pro!', 'success');
    setCurrentPage('home');
    return { success: true, message: 'Registration successful' };
  }, [data.users, toast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage('home');
    toast('Logged out successfully', 'info');
  }, [toast]);

  const navigate = useCallback((page: string, data?: Record<string, string>) => {
    setCurrentPage(page);
    if (data) setPageData(data);
    window.scrollTo(0, 0);
  }, []);

  // Data operations
  const createBooking = useCallback((booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const id = generateId('b');
    const newBooking: Booking = { ...booking, id, createdAt: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, bookings: [...prev.bookings, newBooking] }));
    return id;
  }, []);

  const updateBooking = useCallback((id: string, data_update: Partial<Booking>) => {
    setData(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === id ? { ...b, ...data_update } : b) }));
  }, []);

  const createVehicleBooking = useCallback((booking: Omit<VehicleBooking, 'id' | 'createdAt' | 'timeline'>) => {
    const id = generateId('v');
    const now = new Date().toLocaleString();
    const newBooking: VehicleBooking = {
      ...booking,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      timeline: [{ status: 'requested', timestamp: now }],
    };
    setData(prev => ({ ...prev, vehicleBookings: [...prev.vehicleBookings, newBooking] }));
    return id;
  }, []);

  const updateVehicleBooking = useCallback((id: string, data_update: Partial<VehicleBooking>) => {
    setData(prev => ({
      ...prev,
      vehicleBookings: prev.vehicleBookings.map(v => {
        if (v.id !== id) return v;
        const updated = { ...v, ...data_update };
        if (data_update.status && data_update.status !== v.status) {
          updated.timeline = [...v.timeline, { status: data_update.status as VehicleBooking['status'], timestamp: new Date().toLocaleString() }];
        }
        return updated;
      }),
    }));
  }, []);

  const addReview = useCallback((review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = { ...review, id: generateId('r'), date: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
  }, []);

  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = { ...msg, id: generateId('m'), date: new Date().toISOString().split('T')[0], status: 'unread' };
    setData(prev => ({ ...prev, contactMessages: [...prev.contactMessages, newMsg] }));
  }, []);

  const addWorker = useCallback((worker: Omit<Worker, 'id' | 'totalJobs' | 'completedJobs' | 'earnings'>) => {
    const newWorker: Worker = { ...worker, id: generateId('worker'), totalJobs: 0, completedJobs: 0, earnings: 0, joinedAt: new Date().toISOString().split('T')[0] };
    const newUser: User = { id: newWorker.id, name: worker.name, email: worker.email, phone: worker.phone, password: 'worker123', role: 'worker', address: '', avatar: '👷', isBlocked: false, createdAt: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, workers: [...prev.workers, newWorker], users: [...prev.users, newUser] }));
  }, []);

  const updateWorker = useCallback((id: string, data_update: Partial<Worker>) => {
    setData(prev => ({ ...prev, workers: prev.workers.map(w => w.id === id ? { ...w, ...data_update } : w) }));
  }, []);

  const updateUser = useCallback((id: string, data_update: Partial<User>) => {
    setData(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, ...data_update } : u) }));
    if (currentUser?.id === id) setCurrentUser(prev => prev ? { ...prev, ...data_update } : null);
  }, [currentUser]);

  const blockUser = useCallback((id: string) => {
    setData(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, isBlocked: true } : u) }));
  }, []);

  const unblockUser = useCallback((id: string) => {
    setData(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, isBlocked: false } : u) }));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setData(prev => ({ ...prev, users: prev.users.filter(u => u.id !== id) }));
  }, []);

  const addService = useCallback((service: Service) => {
    setData(prev => ({ ...prev, services: [...prev.services, service] }));
  }, []);

  const updateService = useCallback((id: string, data_update: Partial<Service>) => {
    setData(prev => ({ ...prev, services: prev.services.map(s => s.id === id ? { ...s, ...data_update } : s) }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  }, []);

  const addCoupon = useCallback((coupon: Coupon) => {
    setData(prev => ({ ...prev, coupons: [...prev.coupons, coupon] }));
  }, []);

  const updateCoupon = useCallback((id: string, data_update: Partial<Coupon>) => {
    setData(prev => ({ ...prev, coupons: prev.coupons.map(c => c.id === id ? { ...c, ...data_update } : c) }));
  }, []);

  const deleteCoupon = useCallback((id: string) => {
    setData(prev => ({ ...prev, coupons: prev.coupons.filter(c => c.id !== id) }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setData(prev => ({ ...prev, notifications: prev.notifications.map(n => n.id === id ? { ...n, isRead: true } : n) }));
  }, []);

  const markAllNotificationsRead = useCallback((userId: string) => {
    setData(prev => ({ ...prev, notifications: prev.notifications.map(n => n.userId === userId ? { ...n, isRead: true } : n) }));
  }, []);

  const applyCoupon = useCallback((code: string, amount: number) => {
    const coupon = data.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) return { success: false, discount: 0, message: 'Invalid coupon code' };
    if (amount < coupon.minOrder) return { success: false, discount: 0, message: `Minimum order of ₹${coupon.minOrder} required` };
    const discount = coupon.type === 'percentage' ? Math.min((amount * coupon.discount) / 100, coupon.maxDiscount) : coupon.discount;
    return { success: true, discount: Math.round(discount), message: `Coupon applied! ₹${Math.round(discount)} off` };
  }, [data.coupons]);

  const addPayment = useCallback((payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = { ...payment, id: generateId('p') };
    setData(prev => ({ ...prev, payments: [...prev.payments, newPayment] }));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);

  const value: AppContextType = {
    users: data.users, services: data.services, categories: data.categories,
    bookings: data.bookings, vehicleBookings: data.vehicleBookings,
    reviews: data.reviews, contactMessages: data.contactMessages,
    notifications: data.notifications, workers: data.workers,
    coupons: data.coupons, payments: data.payments,
    currentUser, login, register, logout, updateUser, blockUser, unblockUser, deleteUser,
    currentPage, navigate, pageData,
    createBooking, updateBooking, createVehicleBooking, updateVehicleBooking,
    addReview, addContactMessage, addWorker, updateWorker,
    addService, updateService, deleteService,
    addCoupon, updateCoupon, deleteCoupon,
    markNotificationRead, markAllNotificationsRead,
    applyCoupon, addPayment,
    darkMode, toggleDarkMode, toast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toastState && (
        <div className={`fixed top-4 right-4 z-[9999] animate-slide-down px-5 py-3 rounded-xl shadow-2xl text-white font-medium text-sm flex items-center gap-2 ${
          toastState.type === 'success' ? 'bg-emerald-500' : toastState.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {toastState.type === 'success' ? '✓' : toastState.type === 'error' ? '✗' : 'ℹ'} {toastState.message}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
