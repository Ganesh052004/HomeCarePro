import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, ShoppingCart, CheckCircle, Clock, DollarSign, Star, Trash2, Plus, Ban, Shield, UserCheck, ChevronRight, Download } from 'lucide-react';
import { StatusBadge, Modal } from '../components/SharedComponents';

export default function AdminDashboard() {
  const { currentUser, users, bookings, vehicleBookings, services, categories, reviews, contactMessages, workers, payments, navigate, blockUser, unblockUser, deleteUser, updateBooking, updateVehicleBooking, updateService, updateWorker, toast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({ name: '', categoryId: categories[0]?.id || '', price: 0, description: '', emoji: '🔧' });
  const [workerForm, setWorkerForm] = useState({ name: '', email: '', phone: '', skills: '' });

  if (!currentUser || currentUser.role !== 'admin') {
    return (  
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-6xl mb-4">🔒</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Admin Access Only</h2>
          <button onClick={() => navigate('login')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium">Login as Admin</button>
        </div>
      </div>
    );
  }

  const totalRevenue = payments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalWorkers = workers.length;

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'bookings', label: 'Bookings', icon: '📋' },
    { id: 'vehicle-bookings', label: 'Vehicle', icon: '🚗' },
    { id: 'services', label: 'Services', icon: '🔧' },
    { id: 'workers', label: 'Workers', icon: '👷' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'messages', label: 'Messages', icon: '📧' },
    { id: 'payments', label: 'Payments', icon: '💳' },
  ];

  const assignWorker = (bookingId: string, workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
      updateBooking(bookingId, { workerId, workerName: worker.name, status: 'approved' });
      updateWorker(workerId, { currentJob: bookingId, isAvailable: false });
      toast(`Worker ${worker.name} assigned to booking ${bookingId.slice(-6)}`, 'success');
    }
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-indigo-400" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm">Manage your HomeCare Pro platform</p>
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
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: totalUsers, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500', change: '+12%' },
                { label: 'Total Bookings', value: bookings.length, icon: <ShoppingCart className="w-6 h-6" />, color: 'bg-purple-500', change: '+8%' },
                { label: 'Completed', value: completedBookings, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-emerald-500', change: '+15%' },
                { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-amber-500', change: '+22%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white`}>{stat.icon}</div>
                    <span className="text-xs text-emerald-500 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Pending Bookings', value: pendingBookings, icon: <Clock className="w-5 h-5" />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
                { label: 'Total Workers', value: totalWorkers, icon: <UserCheck className="w-5 h-5" />, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
                { label: 'Reviews', value: reviews.length, icon: <Star className="w-5 h-5" />, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' },
                { label: 'Messages', value: contactMessages.filter(m => m.status === 'unread').length, icon: <DollarSign className="w-5 h-5" />, color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
                  <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>{stat.icon}</div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-sm text-indigo-500 font-medium flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 dark:border-slate-700">
                    {['Booking', 'Customer', 'Service', 'Date', 'Amount', 'Status'].map(h => <th key={h} className="text-left p-3 text-gray-500 font-medium">{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {bookings.slice(-5).reverse().map(b => (
                      <tr key={b.id} className="border-b border-gray-50 dark:border-slate-700/50">
                        <td className="p-3 font-mono text-xs text-gray-500">#{b.id.slice(-6)}</td>
                        <td className="p-3 text-gray-900 dark:text-white">{b.userName}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{b.serviceName}</td>
                        <td className="p-3 text-gray-500">{b.date}</td>
                        <td className="p-3 font-medium text-gray-900 dark:text-white">₹{b.totalAmount}</td>
                        <td className="p-3"><StatusBadge status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Manage Users ({users.length})</h3>
              <button onClick={() => { const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'users.json'; a.click(); }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-slate-700">
                  {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => <th key={h} className="text-left p-3 text-gray-500 font-medium">{h}</th>)}
                </tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 dark:border-slate-700/50">
                      <td className="p-3"><div className="flex items-center gap-2"><span>{u.avatar}</span><span className="font-medium text-gray-900 dark:text-white">{u.name}</span></div></td>
                      <td className="p-3 text-gray-500">{u.email}</td>
                      <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-red-100 dark:bg-red-500/10 text-red-600' : u.role === 'worker' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600' : 'bg-gray-100 dark:bg-gray-500/10 text-gray-600'}`}>{u.role}</span></td>
                      <td className="p-3 text-gray-500">{u.createdAt}</td>
                      <td className="p-3"><StatusBadge status={u.isBlocked ? 'rejected' : 'completed'} /></td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {u.role !== 'admin' && (
                            <>
                              <button onClick={() => u.isBlocked ? unblockUser(u.id) : blockUser(u.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500" title={u.isBlocked ? 'Unblock' : 'Block'}>
                                {u.isBlocked ? <UserCheck className="w-4 h-4 text-emerald-500" /> : <Ban className="w-4 h-4 text-red-500" />}
                              </button>
                              <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500" title="Delete">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-fade-in">
            {bookings.reverse().map(b => (
              <div key={b.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-gray-400">#{b.id.slice(-6)}</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{b.serviceName}</h4>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm text-gray-500">{b.userName} • {b.date} {b.time}</p>
                    {b.workerName && <p className="text-xs text-indigo-500 mt-1">Worker: {b.workerName}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">₹{b.totalAmount}</span>
                    {b.status === 'pending' && (
                      <div className="flex gap-1">
                        <select onChange={e => e.target.value && assignWorker(b.id, e.target.value)} className="text-xs border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                          <option value="">Assign Worker</option>
                          {workers.filter(w => w.isAvailable).map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                        </select>
                        <button onClick={() => updateBooking(b.id, { status: 'approved' })} className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors">Approve</button>
                        <button onClick={() => updateBooking(b.id, { status: 'rejected' })} className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors">Reject</button>
                      </div>
                    )}
                    {b.status === 'approved' && (
                      <button onClick={() => updateBooking(b.id, { status: 'completed' })} className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors">Mark Complete</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vehicle Bookings Tab */}
        {activeTab === 'vehicle-bookings' && (
          <div className="space-y-4 animate-fade-in">
            {vehicleBookings.reverse().map(v => {
              const statusOrder = ['requested', 'pickup-scheduled', 'picked-up', 'in-service', 'ready', 'delivered'];
              const nextStatus = statusOrder[statusOrder.indexOf(v.status) + 1];
              return (
                <div key={v.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{v.vehicleType === 'car' ? '🚗' : '🏍️'}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{v.vehicleNumber}</h4>
                          <p className="text-xs text-gray-500">{v.userName} • {v.serviceType}</p>
                        </div>
                        <StatusBadge status={v.status} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Pickup: {v.preferredDate} {v.preferredTime}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">₹{v.totalAmount}</span>
                      {nextStatus && (
                        <button onClick={() => updateVehicleBooking(v.id, { status: nextStatus as any })}
                          className="px-3 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-lg hover:bg-indigo-600 transition-colors">
                          Mark as {nextStatus.replace(/-/g, ' ')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Manage Services ({services.length})</h3>
              <button onClick={() => setShowServiceModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 dark:border-slate-700">
                    {['Service', 'Category', 'Price', 'Rating', 'Status', 'Actions'].map(h => <th key={h} className="text-left p-3 text-gray-500 font-medium">{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id} className="border-b border-gray-50 dark:border-slate-700/50">
                        <td className="p-3"><div className="flex items-center gap-2"><span className="text-xl">{s.emoji}</span><span className="font-medium text-gray-900 dark:text-white">{s.name}</span></div></td>
                        <td className="p-3 text-gray-500">{categories.find(c => c.id === s.categoryId)?.name || s.categoryId}</td>
                        <td className="p-3 font-medium text-gray-900 dark:text-white">₹{s.price}</td>
                        <td className="p-3 text-gray-500">⭐ {s.rating}</td>
                        <td className="p-3"><StatusBadge status={s.isAvailable ? 'completed' : 'rejected'} /></td>
                        <td className="p-3"><button onClick={() => { updateService(s.id, { isAvailable: !s.isAvailable }); }} className="text-xs text-indigo-500 hover:underline">{s.isAvailable ? 'Disable' : 'Enable'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === 'workers' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Manage Workers ({workers.length})</h3>
              <button onClick={() => setShowWorkerModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                <Plus className="w-4 h-4" /> Add Worker
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map(w => (
                <div key={w.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{w.avatar}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{w.name}</h4>
                      <p className="text-xs text-gray-500">{w.email}</p>
                    </div>
                    <StatusBadge status={w.isAvailable ? 'completed' : 'rejected'} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-500">Rating</p><p className="font-medium">⭐ {w.rating}</p></div>
                    <div><p className="text-gray-500">Total Jobs</p><p className="font-medium">{w.totalJobs}</p></div>
                    <div><p className="text-gray-500">Completed</p><p className="font-medium">{w.completedJobs}</p></div>
                    <div><p className="text-gray-500">Earnings</p><p className="font-medium text-emerald-500">₹{w.earnings.toLocaleString()}</p></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Skills: {w.skills.join(', ')}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => updateWorker(w.id, { isAvailable: !w.isAvailable })} className="flex-1 text-xs px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                      {w.isAvailable ? 'Set Unavailable' : 'Set Available'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fade-in">
            {reviews.reverse().map(r => (
              <div key={r.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{r.userAvatar}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{r.userName}</h4>
                    <p className="text-xs text-gray-500">{r.serviceName} • {r.date}</p>
                  </div>
                  <div className="ml-auto flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{r.review}</p>
              </div>
            ))}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4 animate-fade-in">
            {contactMessages.map(m => (
              <div key={m.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{m.subject}</h4>
                    <p className="text-xs text-gray-500">{m.name} • {m.email} • {m.date}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{m.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Payment History</h3>
              <button onClick={() => { const blob = new Blob([JSON.stringify(payments, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'payments.json'; a.click(); }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-slate-700">
                  {['Transaction', 'User', 'Amount', 'Method', 'Status', 'Date'].map(h => <th key={h} className="text-left p-3 text-gray-500 font-medium">{h}</th>)}
                </tr></thead>
                <tbody>
                  {payments.reverse().map(p => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-slate-700/50">
                      <td className="p-3 font-mono text-xs text-gray-500">{p.transactionId}</td>
                      <td className="p-3 text-gray-900 dark:text-white">{p.userName}</td>
                      <td className="p-3 font-medium text-gray-900 dark:text-white">₹{p.amount}</td>
                      <td className="p-3 text-gray-500 capitalize">{p.method}</td>
                      <td className="p-3"><StatusBadge status={p.status} /></td>
                      <td className="p-3 text-gray-500">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      <Modal isOpen={showServiceModal} onClose={() => setShowServiceModal(false)} title="Add New Service">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name</label>
            <input value={serviceForm.name} onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Service name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select value={serviceForm.categoryId} onChange={e => setServiceForm({ ...serviceForm, categoryId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
              <input type="number" value={serviceForm.price} onChange={e => setServiceForm({ ...serviceForm, price: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emoji Icon</label>
              <input value={serviceForm.emoji} onChange={e => setServiceForm({ ...serviceForm, emoji: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" placeholder="🔧" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm resize-none" placeholder="Service description..." />
          </div>
          <button onClick={() => {
            if (!serviceForm.name || !serviceForm.price) return;
            const newService = { id: `s_${Date.now()}`, name: serviceForm.name, categoryId: serviceForm.categoryId, price: serviceForm.price, originalPrice: Math.round(serviceForm.price * 1.5), description: serviceForm.description, duration: '1-2 hrs', emoji: serviceForm.emoji, rating: 0, reviewCount: 0, isAvailable: true };
            (updateService as any)(newService);
            setShowServiceModal(false);
            toast('Service added successfully!', 'success');
          }} className="w-full py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Add Service</button>
        </div>
      </Modal>

      {/* Add Worker Modal */}
      <Modal isOpen={showWorkerModal} onClose={() => setShowWorkerModal(false)} title="Add New Worker">
        <div className="space-y-4">
          <input value={workerForm.name} onChange={e => setWorkerForm({ ...workerForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" placeholder="Worker name" />
          <input value={workerForm.email} onChange={e => setWorkerForm({ ...workerForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" placeholder="Email address" />
          <input value={workerForm.phone} onChange={e => setWorkerForm({ ...workerForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" placeholder="Phone number" />
          <input value={workerForm.skills} onChange={e => setWorkerForm({ ...workerForm, skills: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm" placeholder="Skills (comma separated)" />
          <button onClick={() => {
            if (!workerForm.name || !workerForm.email) return;
            const newWorker = { id: `w_${Date.now()}`, name: workerForm.name, email: workerForm.email, phone: workerForm.phone, skills: workerForm.skills.split(',').map(s => s.trim()), rating: 0, totalJobs: 0, completedJobs: 0, earnings: 0, isAvailable: true, avatar: '👷', joinedAt: new Date().toISOString().split('T')[0] };
            (updateWorker as any)(newWorker);
            setShowWorkerModal(false);
            toast('Worker added successfully!', 'success');
          }} className="w-full py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors">Add Worker</button>
        </div>
      </Modal>
    </div>
  );
}
