import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, Phone, Star, DollarSign, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { StatusBadge } from '../components/SharedComponents';

export default function WorkerDashboard() {
  const { currentUser, bookings, workers: workerList, updateBooking, updateWorker, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setUpdateNote] = useState('');

  if (!currentUser || currentUser.role !== 'worker') {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-6xl mb-4">🔒</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Worker Access Only</h2>
          <button onClick={() => navigate('login')} className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium">Login as Worker</button>
        </div>
      </div>
    );
  }

  const workerData = workerList.find(w => w.id === currentUser.id);
  const myBookings = bookings.filter(b => b.workerId === currentUser.id);
  const activeJobs = myBookings.filter(b => ['approved', 'in-progress'].includes(b.status));
  const completedJobs = myBookings.filter(b => b.status === 'completed');
  const pendingJobs = bookings.filter(b => b.status === 'pending');
  const totalEarnings = completedJobs.reduce((s, b) => s + b.totalAmount, 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'jobs', label: 'My Jobs', icon: '📋' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4">👷</div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">{currentUser.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
              <p className="text-emerald-100 text-sm">Worker Dashboard • {workerData?.skills.join(', ')}</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={workerData?.isAvailable ? 'completed' : 'rejected'} />
                <span className="text-xs text-emerald-200">{workerData?.isAvailable ? 'Available for jobs' : 'Currently unavailable'}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Active Jobs', value: activeJobs.length },
              { label: 'Completed', value: completedJobs.length },
              { label: 'Earnings', value: `₹${totalEarnings}` },
              { label: 'Rating', value: `⭐ ${workerData?.rating || 0}` },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-emerald-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}>
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Today's Jobs */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Today's Jobs</h3>
              {activeJobs.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No active jobs today</p>
              ) : activeJobs.map(b => (
                <div key={b.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{b.serviceName}</h4>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {b.address.slice(0, 25)}...</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setSelectedJob(b.id); setShowUpdateModal(true); }} className="flex-1 py-2 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors">Update Status</button>
                    <a href={`tel:${b.phone}`} className="py-2 px-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1"><Phone className="w-3 h-3" /> Call</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Job Completion Rate', value: workerData ? Math.round((workerData.completedJobs / Math.max(workerData.totalJobs, 1)) * 100) : 0, color: 'bg-emerald-500' },
                    { label: 'Customer Rating', value: workerData ? Math.round((workerData.rating / 5) * 100) : 0, color: 'bg-yellow-500' },
                    { label: 'On-Time Rate', value: 95, color: 'bg-blue-500' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{stat.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full transition-all`} style={{ width: `${stat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Availability</h3>
                <button onClick={() => updateWorker(currentUser.id, { isAvailable: !workerData?.isAvailable })}
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${workerData?.isAvailable ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'}`}>
                  {workerData?.isAvailable ? '🔴 Set as Unavailable' : '🟢 Set as Available'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-4 animate-fade-in">
            {/* Pending Assignments */}
            {pendingJobs.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Pending Assignments</h3>
                {pendingJobs.map(b => (
                  <div key={b.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{b.serviceName}</h4>
                        <p className="text-sm text-gray-500">{b.userName} • {b.date} {b.time}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">📍 {b.address}</p>
                    <div className="flex gap-2">
                      <button onClick={() => updateBooking(b.id, { status: 'in-progress', workerId: currentUser.id, workerName: currentUser.name })} className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">Accept Job</button>
                      <button onClick={() => updateBooking(b.id, { status: 'pending' })} className="py-2.5 px-6 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">Skip</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active & Completed */}
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">My Jobs</h3>
            {myBookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                <p className="text-5xl mb-4">📋</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Jobs Assigned</h3>
                <p className="text-gray-500">Jobs will appear here when admin assigns them to you</p>
              </div>
            ) : myBookings.reverse().map(b => (
              <div key={b.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{b.serviceName}</h4>
                    <p className="text-sm text-gray-500">{b.userName} • {b.date} {b.time}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">📍 {b.address}</p>
                <div className="flex gap-2">
                  {b.status === 'approved' && (
                    <button onClick={() => updateBooking(b.id, { status: 'in-progress' })} className="flex-1 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">Start Job</button>
                  )}
                  {b.status === 'in-progress' && (
                    <button onClick={() => updateBooking(b.id, { status: 'completed' })} className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">Mark Complete</button>
                  )}
                  {b.status === 'completed' && (
                    <p className="text-sm text-emerald-500 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Completed • ₹{b.totalAmount}</p>
                  )}
                  <a href={`tel:${b.phone}`} className="py-2.5 px-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1"><Phone className="w-3 h-3" /> Call</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 text-center">
                <DollarSign className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Earnings</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedJobs.length}</p>
                <p className="text-sm text-gray-500">Jobs Completed</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{workerData?.rating || '0.0'}</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>

            {/* Earnings History */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Earnings History</h3>
              {completedJobs.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No completed jobs yet</p>
              ) : (
                <div className="space-y-3">
                  {completedJobs.map(b => (
                    <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{b.serviceName}</p>
                        <p className="text-xs text-gray-500">{b.date} • {b.userName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-500">+₹{b.totalAmount}</p>
                        <StatusBadge status={b.paymentStatus} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Update Job Modal */}
      <Modal isOpen={showUpdateModal} onClose={() => { setShowUpdateModal(false); setSelectedJob(null); setUpdateNote(''); }} title="Update Job Status">
        <div className="space-y-4">
          {selectedJob && (
            <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{bookings.find(b => b.id === selectedJob)?.serviceName}</p>
              <p className="text-xs text-gray-500">{bookings.find(b => b.id === selectedJob)?.userName}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Status</label>
            <select className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm">
              <option>Approved → In Progress</option>
              <option>In Progress → Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
            <textarea value={updateNote} onChange={e => setUpdateNote(e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm resize-none"
              placeholder="Add any notes about the service..." />
          </div>
          <button onClick={() => {
            if (selectedJob) {
              const booking = bookings.find(b => b.id === selectedJob);
              if (booking?.status === 'approved') updateBooking(selectedJob, { status: 'in-progress' });
              else if (booking?.status === 'in-progress') updateBooking(selectedJob, { status: 'completed' });
            }
            setShowUpdateModal(false);
            setSelectedJob(null);
            setUpdateNote('');
          }} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Update Status
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
