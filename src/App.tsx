import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { LoginPage, RegisterPage, ForgotPasswordPage, OTPPage } from './pages/AuthPages';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import { ServicesPage, VehicleServicePage, VehicleTrackingPage } from './pages/ServicePages';
import ContactPage from './pages/ContactPage';
import { WhatsAppButton } from './components/SharedComponents';

function AppContent() {
  const { currentPage, darkMode } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'login': return <LoginPage />;
      case 'register': return <RegisterPage />;
      case 'forgot-password': return <ForgotPasswordPage />;
      case 'otp': return <OTPPage />;
      case 'services': return <ServicesPage />;
      case 'vehicle-service': return <VehicleServicePage />;
      case 'vehicle-tracking': return <VehicleTrackingPage />;
      case 'contact': return <ContactPage />;
      case 'user-dashboard': return <UserDashboard />;
      case 'user-bookings': return <UserDashboard />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'worker-dashboard': return <WorkerDashboard />;
      default: return <HomePage />;
    }
  };

  const hideNavFooter = ['login', 'register', 'forgot-password', 'otp'].includes(currentPage);

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white ${darkMode ? 'dark' : ''}`}>
      {!hideNavFooter && <Navbar />}
      {renderPage()}
      {!hideNavFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
