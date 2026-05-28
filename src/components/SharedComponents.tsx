import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, Star, ChevronDown, ChevronUp, Sparkles, Zap, Shield, Clock, CheckCircle2, X, Phone, MessageCircle } from 'lucide-react';

/* ==================== HERO SECTION ==================== */
export function HeroSection() {
  const { navigate, services } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredServices = services.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-200/10 to-cyan-200/10 rounded-full blur-3xl" />
        {/* Floating icons */}
        {['⚡', '🔧', '🚗', '❄️', '🧹', '🎨', '🐛', '🫧'].map((emoji, i) => (
          <div key={i} className="absolute text-3xl md:text-4xl opacity-20 dark:opacity-10 animate-float select-none"
            style={{ top: `${15 + (i * 10) % 70}%`, left: `${5 + (i * 12) % 90}%`, animationDelay: `${i * 0.5}s` }}>
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> #1 Home Services Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Professional Services
              <br />
              <span className="text-gradient">at Your Doorstep</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Book trusted professionals for home services, vehicle care, and appliance repair. Quality guaranteed, prices transparent.
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none border border-gray-200 dark:border-slate-700 overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for a service..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
                />
                <button onClick={() => navigate('services')} className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all flex items-center gap-2">
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {/* Search Results Dropdown */}
              {searchQuery && filteredServices.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-10 animate-slide-down">
                  {filteredServices.map(s => (
                    <button key={s.id} onClick={() => navigate('services', { serviceId: s.id })}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-left transition-colors">
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p>
                        <p className="text-xs text-gray-500">Starting ₹{s.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[{ label: 'Happy Customers', value: '50K+' }, { label: 'Expert Workers', value: '500+' }, { label: 'Services', value: '20+' }, { label: 'Cities', value: '15+' }].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Service Cards Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in-right">
            {services.slice(0, 6).map((s, i) => (
              <button key={s.id} onClick={() => navigate('services', { serviceId: s.id })}
                className={`p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all text-left ${i % 3 === 0 ? 'col-span-2' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{s.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{s.name}</h3>
                    <p className="text-xs text-gray-500">From ₹{s.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{s.rating} ({s.reviewCount})</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== FEATURES SECTION ==================== */
export function FeaturesSection() {
  const features = [
    { icon: <Shield className="w-6 h-6" />, title: 'Verified Professionals', desc: 'All workers are background verified and professionally trained', color: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { icon: <Zap className="w-6 h-6" />, title: 'Instant Booking', desc: 'Book any service in under 60 seconds with our streamlined process', color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { icon: <Clock className="w-6 h-6" />, title: 'On-Time Service', desc: 'Punctual professionals who respect your time and schedule', color: 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Quality Guaranteed', desc: '100% satisfaction guarantee with free re-service if needed', color: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose <span className="text-gradient">HomeCare Pro</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We deliver exceptional service quality with trained professionals and guaranteed satisfaction</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all animate-fade-in stagger-${i + 1}`}>
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>{f.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CATEGORIES SECTION ==================== */
export function CategoriesSection() {
  const { categories, navigate } = useApp();
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Service <span className="text-gradient">Categories</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Browse through our wide range of professional services</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <button key={cat.id} onClick={() => navigate('services', { categoryId: cat.id })}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.color} p-8 text-white hover:shadow-2xl hover:-translate-y-1 transition-all animate-fade-in stagger-${i + 1}`}>
              <div className="absolute top-0 right-0 text-8xl opacity-20 group-hover:opacity-30 transition-opacity -mr-4 -mt-4">{cat.emoji}</div>
              <div className="relative">
                <span className="text-5xl mb-4 block">{cat.emoji}</span>
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-white/80 text-sm">{cat.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== TESTIMONIALS ==================== */
export function TestimonialsSection() {
  const { reviews } = useApp();
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our <span className="text-gradient">Customers Say</span></h2>
          <p className="text-gray-600 dark:text-gray-400">Trusted by thousands of happy customers across India</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r, i) => (
            <div key={r.id} className={`p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 animate-fade-in stagger-${i + 1}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{r.userAvatar}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{r.userName}</h4>
                  <p className="text-xs text-gray-500">{r.serviceName} • {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== FAQ SECTION ==================== */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'How do I book a service?', a: 'Simply browse our services, select the one you need, choose a date and time, and confirm your booking. You can pay online or choose cash on delivery.' },
    { q: 'Are your professionals verified?', a: 'Yes, all our professionals undergo thorough background verification and professional training before being onboarded.' },
    { q: 'What if I\'m not satisfied with the service?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll send another professional at no extra cost or provide a full refund.' },
    { q: 'How does vehicle pickup & drop work?', a: 'Book a vehicle service, enter your pickup address and preferred time. Our agent will collect your vehicle, get it serviced, and deliver it back to you.' },
    { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards (via Razorpay), and Cash on Delivery (COD) for your convenience.' },
    { q: 'Do you offer any discounts?', a: 'Yes! Use code WELCOME50 for 50% off your first booking. Check our coupons section for more ongoing offers.' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <p className="text-gray-600 dark:text-gray-400">Find answers to common questions about our services</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed animate-slide-down">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== VEHICLE TRACKER ==================== */
export function VehicleTracker({ booking }: { booking: { timeline: { status: string; timestamp: string; note?: string }[]; status: string } }) {
  const statusOrder = ['requested', 'pickup-scheduled', 'picked-up', 'in-service', 'ready', 'delivered'];
  const statusLabels: Record<string, string> = {
    'requested': 'Service Requested',
    'pickup-scheduled': 'Pickup Scheduled',
    'picked-up': 'Vehicle Picked Up',
    'in-service': 'In Service',
    'ready': 'Ready for Delivery',
    'delivered': 'Delivered',
  };
  const statusIcons: Record<string, string> = {
    'requested': '📋', 'pickup-scheduled': '🚛', 'picked-up': '📦',
    'in-service': '🔧', 'ready': '✅', 'delivered': '🏠',
  };
  const currentIdx = statusOrder.indexOf(booking.status);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="relative flex items-center justify-between">
        {statusOrder.map((status, i) => (
          <div key={status} className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
              i <= currentIdx ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600'
            }`}>
              {statusIcons[status]}
            </div>
            <p className={`text-[10px] mt-1 text-center font-medium hidden md:block ${i <= currentIdx ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
              {statusLabels[status]}
            </p>
          </div>
        ))}
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 dark:bg-slate-700 -z-0">
          <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${(currentIdx / (statusOrder.length - 1)) * 100}%` }} />
        </div>
      </div>
      {/* Timeline */}
      <div className="space-y-2 mt-6">
        {[...booking.timeline].reverse().map((t, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <span className="text-xl">{statusIcons[t.status]}</span>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{statusLabels[t.status]}</p>
              <p className="text-xs text-gray-500">{t.timestamp}</p>
              {t.note && <p className="text-xs text-indigo-500 mt-0.5">{t.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== WHATSAPP BUTTON ==================== */
export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">Chat with us</h4>
                <p className="text-green-100 text-xs">Typically replies within minutes</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-white" /></button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">Hi! 👋 How can we help you today?</p>
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..."
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-sm bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-green-500" />
            <a href={`https://wa.me/919876543210?text=${encodeURIComponent(message || 'Hi, I need help with a service booking')}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors">
              <MessageCircle className="w-4 h-4" /> Send via WhatsApp
            </a>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-200 dark:shadow-green-900/30 flex items-center justify-center hover:scale-110 transition-all">
        <Phone className="w-6 h-6" />
      </button>
    </div>
  );
}

/* ==================== STATUS BADGE ==================== */
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'pending': 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    'approved': 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
    'rejected': 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
    'in-progress': 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
    'completed': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    'cancelled': 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400',
    'requested': 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    'pickup-scheduled': 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
    'picked-up': 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
    'in-service': 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
    'ready': 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
    'delivered': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    'paid': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    'refunded': 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400',
    'unread': 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
    'read': 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
    'replied': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace(/-/g, ' ')}
    </span>
  );
}

/* ==================== MODAL ==================== */
export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ==================== AI RECOMMENDATION ==================== */
export function AIRecommendation() {
  const { services, navigate } = useApp();
  const recommendations = [...services].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-900 dark:to-indigo-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered Recommendations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Recommended <span className="text-gradient">For You</span></h2>
          <p className="text-gray-600 dark:text-gray-400">Smart service suggestions based on popular demand</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((s, i) => (
            <button key={s.id} onClick={() => navigate('services', { serviceId: s.id })}
              className={`group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in stagger-${i + 1}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{s.emoji}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{s.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{s.rating} ({s.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{s.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">₹{s.price}</span>
                  {s.originalPrice > s.price && <span className="text-sm text-gray-400 line-through ml-2">₹{s.originalPrice}</span>}
                </div>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Book Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== COUPON SECTION ==================== */
export function CouponsSection() {
  const { coupons } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Exclusive <span className="text-gradient">Coupons & Offers</span></h2>
          <p className="text-gray-600 dark:text-gray-400">Save big on your next service booking</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.filter(c => c.isActive).map((coupon, i) => (
            <div key={coupon.id} className={`relative overflow-hidden rounded-2xl border-2 border-dashed ${i % 2 === 0 ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-500/5' : 'border-cyan-300 dark:border-cyan-600 bg-cyan-50 dark:bg-cyan-500/5'} p-5 animate-fade-in stagger-${i + 1}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{coupon.type === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}</span>
                <span className="text-xs bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">OFF</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{coupon.description}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700">{coupon.code}</code>
                <button onClick={() => copyCode(coupon.code)} className="px-3 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-lg hover:bg-indigo-600 transition-colors">
                  {copiedCode === coupon.code ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Min. order: ₹{coupon.minOrder} • Exp: {coupon.expiryDate}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
