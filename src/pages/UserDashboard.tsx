import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, Phone, Star, Heart, ChevronRight, Edit2, Save, X } from 'lucide-react';
import { StatusBadge } from '../components/SharedComponents';

export default function UserDashboard() {
  const { currentUser, bookings, vehicleBookings, reviews, notifications, navigate, updateBooking, addReview, updateUser, markNotificationRead } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewModal, setReviewModal] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '', address: currentUser?.address || '' });

  if (!currentUser) return null;
  const myBookings = bookings.filter(b => b.userId === currentUser.id);
  const myVehicleBookings = vehicleBookings.filter(v => v.userId === currentUser.id);
  const myReviews = reviews.filter(r => r.userId === currentUser.id);
  const myNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadNotifs = myNotifs.filter(n => !n.isRead);
  const totalSpent = myBookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0);
  const completedBookings = myBookings.filter(b => b.status === 'completed').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '📋' },
    { id: 'vehicle', label: 'Vehicle Services', icon: '🚗' },
    { id: 'reviews', label: 'My Reviews', icon: '⭐' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4">{currentUser.avatar}</div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">{currentUser.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
              <p className="text-indigo-100">{currentUser.email}</p>
              <p className="text-xs text-indigo-200 mt-1">Referral Code: <span className="font-mono font-bold">{currentUser.referralCode}</span></p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold">{myBookings.length}</p>
              <p className="text-xs text-indigo-100">Total Bookings</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold">{completedBookings}</p>
              <p className="text-xs text-indigo-100">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold">₹{totalSpent}</p>
              <p className="text-xs text-indigo-100">Total Spent</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-8 pb-2 no-scrollbar">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}>
              <span>{tab.icon}</span> {tab.label}
              {tab.id === 'notifications' && unreadNotifs.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadNotifs.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Book Service', icon: '📋', page: 'services' },
                  { label: 'Vehicle Pickup', icon: '🚗', page: 'vehicle-service' },
                  { label: 'My Bookings', icon: '📅', page: 'user-bookings' },
                  { label: 'Track Vehicle', icon: '📍', page: 'vehicle-tracking' },
                ].map(action => (
                  <button key={action.page} onClick={() => navigate(action.page)}
                    className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl text-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="text-2xl block mb-1">{action.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-sm text-indigo-500 font-medium flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {myBookings.slice(-3).reverse().map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-2xl">📋</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{b.serviceName}</p>
                      <p className="text-xs text-gray-500">{b.date} • {b.time}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                ))}
                {myBookings.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No bookings yet</p>}
              </div>
            </div>

            {/* Vehicle Bookings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Vehicle Services</h3>
                <button onClick={() => setActiveTab('vehicle')} className="text-sm text-indigo-500 font-medium flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {myVehicleBookings.slice(-2).reverse().map(v => (
                  <div key={v.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-2xl">{v.vehicleType === 'car' ? '🚗' : '🏍️'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{v.vehicleNumber}</p>
                      <p className="text-xs text-gray-500">{v.serviceType}</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
                {myVehicleBookings.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No vehicle bookings</p>}
              </div>
            </div>

            {/* Favorite Services */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-red-500" /> Favorite Services</h3>
                {currentUser.favoriteServices && currentUser.favoriteServices.length > 0 ? (
                  <div className="space-y-3">
                    {currentUser.favoriteServices.map(fid => (
                      <div key={fid} className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl text-sm text-gray-500">{fid}</div>
                    ))}
                </div>
              ) : <p className="text-sm text-gray-500 text-center py-4">No favorite services yet</p>}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-fade-in">
            {myBookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                <p className="text-5xl mb-4">📋</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Bookings Yet</h3>
                <p className="text-gray-500 mb-4">Book your first service now</p>
                <button onClick={() => navigate('services')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Browse Services</button>
              </div>
            ) : myBookings.reverse().map(b => (
              <div key={b.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{b.serviceName}</h4>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {b.address.slice(0, 30)}...</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {b.phone}</span>
                    </div>
                    {b.workerName && <p className="text-xs text-indigo-500 mt-2">Assigned Worker: {b.workerName}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">₹{b.totalAmount}</p>
                    <p className="text-xs text-gray-500 capitalize">{b.paymentMethod}</p>
                    <StatusBadge status={b.paymentStatus} />
                    {b.status === 'completed' && !b.rating && (
                      <button onClick={() => setReviewModal(b.id)} className="mt-2 text-xs text-indigo-500 font-medium hover:underline">Rate & Review</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vehicle' && (
          <div className="space-y-4 animate-fade-in">
            {myVehicleBookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                <p className="text-5xl mb-4">🚗</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Vehicle Bookings</h3>
                <button onClick={() => navigate('vehicle-service')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Book Vehicle Service</button>
              </div>
            ) : myVehicleBookings.reverse().map(v => (
              <div key={v.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{v.vehicleType === 'car' ? '🚗' : '🏍️'}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{v.vehicleNumber}</h4>
                    <p className="text-sm text-gray-500">{v.serviceType}</p>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div><p className="text-gray-500">Pickup Date</p><p className="font-medium text-gray-900 dark:text-white">{v.preferredDate}</p></div>
                  <div><p className="text-gray-500">Time</p><p className="font-medium text-gray-900 dark:text-white">{v.preferredTime}</p></div>
                  <div><p className="text-gray-500">Amount</p><p className="font-medium text-gray-900 dark:text-white">₹{v.totalAmount}</p></div>
                  <div><p className="text-gray-500">Agent</p><p className="font-medium text-gray-900 dark:text-white">{v.assignedAgent || 'Pending'}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fade-in">
            {myReviews.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                <p className="text-5xl mb-4">⭐</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Reviews Yet</h3>
                <p className="text-gray-500">Complete a service to leave a review</p>
              </div>
            ) : myReviews.reverse().map(r => (
              <div key={r.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                  <span className="text-sm text-gray-500">{r.serviceName}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{r.review}</p>
                <p className="text-xs text-gray-400 mt-2">{r.date}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3 animate-fade-in">
            {myNotifs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                <p className="text-5xl mb-4">🔔</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Notifications</h3>
              </div>
            ) : myNotifs.reverse().map(n => (
              <button key={n.id} onClick={() => markNotificationRead(n.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${n.isRead ? 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700' : 'bg-indigo-50 dark:bg-indigo-500/5 border-indigo-200 dark:border-indigo-500/20'}`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{n.type === 'booking' ? '📋' : n.type === 'payment' ? '💳' : n.type === 'promotion' ? '🎉' : '⚙️'}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                  </div>
                  {!n.isRead && <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mt-1 shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h3>
                <button onClick={() => setEditProfile(!editProfile)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                  {editProfile ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />} {editProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-slate-700">
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl">{currentUser.avatar}</div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                  <p className="text-xs text-indigo-500 mt-1">Member since {currentUser.createdAt}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                  {editProfile ? (
                    <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : <p className="text-gray-900 dark:text-white">{currentUser.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                  {editProfile ? (
                    <input value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : <p className="text-gray-900 dark:text-white">{currentUser.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
                  {editProfile ? (
                    <textarea value={profileForm.address} onChange={e => setProfileForm({ ...profileForm, address: e.target.value })} rows={2}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                  ) : <p className="text-gray-900 dark:text-white">{currentUser.address}</p>}
                </div>
                {editProfile && (
                  <button onClick={() => { updateUser(currentUser.id, profileForm); setEditProfile(false); }}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Account Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-gray-500">Email</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-gray-500">Referral Code</span>
                    <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{currentUser.referralCode}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-gray-500">Member Since</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setReviewModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Rate Your Experience</h3>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} onClick={() => setReviewForm({ ...reviewForm, rating: i })}>
                  <Star className={`w-8 h-8 ${i <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                </button>
              ))}
            </div>
            <textarea value={reviewForm.review} onChange={e => setReviewForm({ ...reviewForm, review: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
              rows={3} placeholder="Share your experience..." />
            <div className="flex gap-3">
              <button onClick={() => setReviewModal(null)} className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              <button onClick={() => {
                const booking = bookings.find(b => b.id === reviewModal);
                if (booking) {
                  addReview({ userId: currentUser.id, userName: currentUser.name, userAvatar: currentUser.avatar, serviceId: booking.serviceId, serviceName: booking.serviceName, rating: reviewForm.rating, review: reviewForm.review });
                  updateBooking(reviewModal, { rating: reviewForm.rating, review: reviewForm.review });
                }
                setReviewModal(null);
                setReviewForm({ rating: 5, review: '' });
              }} className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
