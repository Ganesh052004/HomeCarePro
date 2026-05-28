import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { navigate } = useApp();
  
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300">
      {/* CTA Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Book Your First Service?</h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">Get professional services at your doorstep. Pay only ₹10 to confirm your booking.</p>
              <button onClick={() => navigate('register')} className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-xl transition-all inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">HC</div>
              <span className="text-xl font-bold text-white">HomeCare<span className="text-indigo-400">Pro</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">Professional home services, vehicle care, and appliance repair at your doorstep in Davanagere, Karnataka.</p>
            <div className="flex gap-3">
              {['f', '𝕏', '📷', '▶'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-all text-sm font-bold">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'Services', 'Vehicle Pickup', 'About Us', 'Contact'].map(link => (
                <button key={link} onClick={() => navigate(link.toLowerCase().replace(' ', '-'))} className="block text-sm text-gray-400 hover:text-indigo-400 transition-colors">{link}</button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <div className="space-y-2">
              {['Electrician', 'Plumber', 'AC Repair', 'Car Washing', 'Bike Servicing', 'Appliance Repair'].map(s => (
                <button key={s} onClick={() => navigate('services')} className="block text-sm text-gray-400 hover:text-indigo-400 transition-colors">{s}</button>
              ))}
            </div>
          </div>

          {/* Contact - UPDATED */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">HomeCare Pro<br/>HomeCare Pro, Office No. 301,Davanagere, Karnataka<br/>577250</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-gray-400 font-medium">+91 701997625</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-gray-400">support@homecarepro.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 HomeCare Pro. All rights reserved. Davanagere, Karnataka.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}