import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Star, Filter, Clock, ChevronRight, ArrowLeft, CheckCircle2, CreditCard, Banknote, Wallet } from 'lucide-react';
import { StatusBadge, Modal } from '../components/SharedComponents';

/* ==================== SERVICES PAGE ==================== */
export function ServicesPage() {
  const { services, categories, navigate, pageData } = useApp();
  const [searchQuery, setSearchQuery] = useState(pageData.serviceId ? '' : '');
  const [selectedCategory, setSelectedCategory] = useState(pageData.categoryId || 'all');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  let filtered = services.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || s.categoryId === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => b.rating - a.rating);

  // If a specific service is selected, show booking form
  const selectedService = services.find(s => s.id === pageData.serviceId);
  if (selectedService) return <ServiceBookingPage service={selectedService} />;

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-400">Professional services at your doorstep</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Search services..." />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-slate-700">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-6 animate-slide-down">
            <button onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700'}`}>
              All Services
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700'}`}>
                {cat.emoji} {cat.name}
              </button>
            ))}
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400">
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((s, i) => (
            <div key={s.id} className={`group bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in stagger-${(i % 8) + 1}`}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{s.emoji}</span>
                  <StatusBadge status={s.isAvailable ? 'completed' : 'rejected'} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{s.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{s.rating}</span>
                  <span className="text-xs text-gray-500">({s.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">{s.duration}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                  <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">₹{s.price}</span>
                    {s.originalPrice > s.price && <span className="text-sm text-gray-400 line-through ml-1">₹{s.originalPrice}</span>}
                  </div>
                  <button onClick={() => navigate('services', { serviceId: s.id })}
                    className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==================== SERVICE BOOKING PAGE ==================== */
function ServiceBookingPage({ service }: { service: { id: string; name: string; emoji: string; price: number; originalPrice: number; description: string; duration: string; rating: number; reviewCount: number } }) {
  const { navigate, currentUser, createBooking, toast, applyCoupon, addPayment } = useApp();
  const [form, setForm] = useState<{ date: string; time: string; address: string; phone: string; paymentMethod: 'razorpay' | 'upi' | 'cod'; couponCode: string }>({ date: '', time: '', address: currentUser?.address || '', phone: currentUser?.phone || '', paymentMethod: 'razorpay', couponCode: '' });
  const [couponMsg, setCouponMsg] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  if (!currentUser) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center animate-scale-in">
          <p className="text-6xl mb-6">🔒</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Please Login to Book</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to book a service</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('login')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Login</button>
            <button onClick={() => navigate('register')} className="px-6 py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Sign Up</button>
          </div>
        </div>
      </div>
    );
  }

  const handleCoupon = () => {
    if (!form.couponCode) return;
    const result = applyCoupon(form.couponCode, service.price);
    setCouponMsg(result.message);
    if (result.success) setDiscount(result.discount);
    else setDiscount(0);
  };

  const handleBook = () => {
    if (!form.date || !form.time || !form.address || !form.phone) {
      toast('Please fill all required fields', 'error');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    const finalAmount = service.price - discount;
    const bookingId = createBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      serviceId: service.id,
      serviceName: service.name,
      date: form.date,
      time: form.time,
      address: form.address,
      phone: form.phone,
      status: 'pending',
      totalAmount: finalAmount,
      paymentStatus: form.paymentMethod === 'cod' ? 'pending' : 'paid',
      paymentMethod: form.paymentMethod,
      couponUsed: discount > 0 ? form.couponCode : undefined,
      discount: discount > 0 ? discount : undefined,
    });

    if (form.paymentMethod !== 'cod') {
      addPayment({ bookingId, userId: currentUser.id, userName: currentUser.name, amount: finalAmount, method: form.paymentMethod, status: 'success', date: new Date().toISOString().split('T')[0], transactionId: `TXN${Date.now()}` });
    }

    setShowPayment(false);
    toast('Booking confirmed successfully!', 'success');
    navigate('user-bookings');
  };

  const finalAmount = service.price - discount;

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button onClick={() => navigate('services')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 sticky top-24">
              <span className="text-6xl mb-4 block">{service.emoji}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-gray-900 dark:text-white">{service.rating}</span>
                <span className="text-sm text-gray-500">({service.reviewCount} reviews)</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service Price</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{service.price}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-500 mt-1">
                    <span className="text-sm">Discount ({form.couponCode})</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">₹{finalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Book Service</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Time *</label>
                  <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select time</option>
                    {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Service Address *</label>
                <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2} required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter your full address" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your phone number" />
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Coupon Code</label>
                <div className="flex gap-2">
                  <input value={form.couponCode} onChange={e => { setForm({ ...form, couponCode: e.target.value }); setCouponMsg(''); setDiscount(0); }}
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                    placeholder="Enter coupon code" />
                  <button onClick={handleCoupon} className="px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">Apply</button>
                </div>
                {couponMsg && <p className={`text-xs mt-1 ${couponMsg.includes('Invalid') || couponMsg.includes('Minimum') ? 'text-red-500' : 'text-emerald-500'}`}>{couponMsg}</p>}
              </div>

              <button onClick={handleBook}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all text-lg">
                Book Now — ₹{finalAmount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={showPayment} onClose={() => setShowPayment(false)} title="Complete Payment">
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-center">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">Amount to Pay</p>
            <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">₹{finalAmount}</p>
          </div>
          <div className="space-y-3">
            {[
              { method: 'razorpay' as const, icon: <CreditCard className="w-5 h-5" />, label: 'Credit/Debit Card (Razorpay)', desc: 'Pay securely with Razorpay' },
              { method: 'upi' as const, icon: <Wallet className="w-5 h-5" />, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
              { method: 'cod' as const, icon: <Banknote className="w-5 h-5" />, label: 'Cash on Delivery', desc: 'Pay when service is completed' },
            ].map(pm => (
              <button key={pm.method} onClick={() => { setForm({ ...form, paymentMethod: pm.method }); handlePayment(); }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${form.paymentMethod === pm.method ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.paymentMethod === pm.method ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}`}>{pm.icon}</div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{pm.label}</p>
                  <p className="text-xs text-gray-500">{pm.desc}</p>
                </div>
                <div className="ml-auto">{form.paymentMethod === pm.method ? <CheckCircle2 className="w-5 h-5 text-indigo-500" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}</div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ==================== VEHICLE SERVICE PAGE ==================== */
export function VehicleServicePage() {
  const { navigate, currentUser, createVehicleBooking, toast } = useApp();
  const [form, setForm] = useState({ vehicleType: 'car' as 'car' | 'bike', vehicleNumber: '', pickupAddress: currentUser?.address || '', preferredDate: '', preferredTime: '', serviceType: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!currentUser) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center animate-scale-in">
          <p className="text-6xl mb-6">🔒</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Please Login to Book</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to book a vehicle service</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('login')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Login</button>
            <button onClick={() => navigate('register')} className="px-6 py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Sign Up</button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleNumber || !form.pickupAddress || !form.preferredDate || !form.preferredTime || !form.serviceType) {
      toast('Please fill all required fields', 'error');
      return;
    }
    const prices: Record<string, number> = { 'Basic Wash': form.vehicleType === 'car' ? 399 : 199, 'Full Service': form.vehicleType === 'car' ? 1499 : 599, 'Detailing': 2499, 'Engine Repair': 1999, 'Full Service + Detailing': 2999 };
    const id = createVehicleBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      vehicleType: form.vehicleType,
      vehicleNumber: form.vehicleNumber.toUpperCase(),
      pickupAddress: form.pickupAddress,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      serviceType: form.serviceType,
      status: 'requested',
      totalAmount: prices[form.serviceType] || 999,
      paymentStatus: 'pending',
      notes: form.notes,
    });
    setBookingId(id);
    setSubmitted(true);
    toast('Vehicle service request submitted!', 'success');
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed! 🚗</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Your vehicle service request has been submitted.</p>
          <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">Booking ID</p>
            <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300 font-mono">{bookingId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">Our pickup agent will contact you shortly to confirm the pickup schedule.</p>
          <div className="space-y-3">
            <button onClick={() => navigate('vehicle-tracking')} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Track Your Vehicle</button>
            <button onClick={() => navigate('home')} className="w-full py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">Go to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const serviceOptions = form.vehicleType === 'car'
    ? ['Basic Wash', 'Full Service', 'Detailing', 'Engine Repair', 'Full Service + Detailing']
    : ['Basic Wash', 'Full Service', 'Engine Repair'];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🚗 Vehicle Pickup & Drop Service</h1>
          <p className="text-gray-600 dark:text-gray-400">We'll pick up your vehicle, service it, and deliver it back to your doorstep</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[{ num: '1', label: 'Fill Details' }, { num: '2', label: 'Pickup' }, { num: '3', label: 'Service' }, { num: '4', label: 'Delivery' }].map((step, i) => (
            <div key={i} className={`text-center p-3 rounded-xl ${i === 0 ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold ${i === 0 ? 'bg-white/20' : 'bg-gray-100 dark:bg-slate-700'}`}>{step.num}</div>
              <p className="text-xs font-medium">{step.label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 space-y-5">
          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle Type *</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'car' as const, emoji: '🚗', label: 'Car' },
                { type: 'bike' as const, emoji: '🏍️', label: 'Bike' },
              ].map(v => (
                <button key={v.type} type="button" onClick={() => setForm({ ...form, vehicleType: v.type })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${form.vehicleType === v.type ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'}`}>
                  <span className="text-3xl block mb-1">{v.emoji}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Number *</label>
            <input value={form.vehicleNumber} onChange={e => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })} required
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., MH02AB1234" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pickup Address *</label>
            <textarea value={form.pickupAddress} onChange={e => setForm({ ...form, pickupAddress: e.target.value })} required rows={2}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Enter pickup address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preferred Date *</label>
              <input type="date" value={form.preferredDate} onChange={e => setForm({ ...form, preferredDate: e.target.value })} min={new Date().toISOString().split('T')[0]} required
                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preferred Time *</label>
              <select value={form.preferredTime} onChange={e => setForm({ ...form, preferredTime: e.target.value })} required
                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select time</option>
                {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Service Type *</label>
            <select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })} required
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select service</option>
              {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Additional Notes</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Any specific issues or requirements..." />
          </div>

          <button type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-lg">
            Submit Service Request
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==================== VEHICLE TRACKING PAGE ==================== */
export function VehicleTrackingPage() {
  const { currentUser, vehicleBookings, navigate } = useApp();
  const [searchId, setSearchId] = useState('');

  if (!currentUser) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
        <div className="text-center animate-scale-in">
          <p className="text-6xl mb-6">🚗</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Track Your Vehicle</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Login to view your vehicle service status</p>
          <button onClick={() => navigate('login')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Login</button>
        </div>
      </div>
    );
  }

  const myBookings = vehicleBookings.filter(v => v.userId === currentUser.id);
  const searched = searchId ? myBookings.filter(v => v.id.includes(searchId) || v.vehicleNumber.includes(searchId.toUpperCase())) : myBookings;

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🚗 Vehicle Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your vehicle service status in real-time</p>
        </div>

        <div className="relative mb-6">
          <input value={searchId} onChange={e => setSearchId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by booking ID or vehicle number..." />
        </div>

        <div className="space-y-6">
          {searched.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No vehicle bookings found</h3>
              <p className="text-gray-500 mb-4">Book a vehicle service to start tracking</p>
              <button onClick={() => navigate('vehicle-service')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Book Vehicle Service</button>
            </div>
          ) : searched.map(booking => {
            const statusOrder = ['requested', 'pickup-scheduled', 'picked-up', 'in-service', 'ready', 'delivered'];
            const statusLabels: Record<string, string> = {
              'requested': 'Service Requested', 'pickup-scheduled': 'Pickup Scheduled', 'picked-up': 'Vehicle Picked Up',
              'in-service': 'In Service', 'ready': 'Ready for Delivery', 'delivered': 'Delivered',
            };
            const statusIcons: Record<string, string> = { 'requested': '📋', 'pickup-scheduled': '🚛', 'picked-up': '📦', 'in-service': '🔧', 'ready': '✅', 'delivered': '🏠' };
            const currentIdx = statusOrder.indexOf(booking.status);

            return (
              <div key={booking.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{booking.vehicleType === 'car' ? '🚗' : '🏍️'} {booking.vehicleNumber}</p>
                    <p className="text-sm text-gray-500">{booking.serviceType} • Booking #{booking.id.slice(-6)}</p>
                  </div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                    booking.status === 'delivered' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                  }`}>{statusLabels[booking.status]}</span>
                </div>

                {/* Progress */}
                <div className="relative flex items-center justify-between mb-6 px-2">
                  {statusOrder.map((status, i) => (
                    <div key={status} className="flex flex-col items-center relative z-10">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 transition-all ${i <= currentIdx ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600'}`}>
                        {statusIcons[status]}
                      </div>
                      <p className={`text-[10px] mt-1 text-center font-medium ${i <= currentIdx ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>{statusLabels[status]}</p>
                    </div>
                  ))}
                  <div className="absolute top-4.5 left-4.5 right-4.5 h-0.5 bg-gray-200 dark:bg-slate-700 -z-0">
                    <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${(currentIdx / (statusOrder.length - 1)) * 100}%` }} />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><p className="text-gray-500">Pickup Date</p><p className="font-medium text-gray-900 dark:text-white">{booking.preferredDate}</p></div>
                  <div><p className="text-gray-500">Pickup Time</p><p className="font-medium text-gray-900 dark:text-white">{booking.preferredTime}</p></div>
                  <div><p className="text-gray-500">Amount</p><p className="font-medium text-gray-900 dark:text-white">₹{booking.totalAmount}</p></div>
                  <div><p className="text-gray-500">Agent</p><p className="font-medium text-gray-900 dark:text-white">{booking.assignedAgent || 'Pending'}</p></div>
                </div>

                {/* Timeline */}
                <div className="mt-4 space-y-2">
                  {[...booking.timeline].reverse().map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                      <span>{statusIcons[t.status]}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{statusLabels[t.status]}</p>
                        <p className="text-xs text-gray-500">{t.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
