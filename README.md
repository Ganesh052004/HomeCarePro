# HomeCare Pro - Professional Multi-Service Platform

A modern, responsive web application for booking home services, vehicle care, and appliance repairs. Built with React, TypeScript, and Tailwind CSS.

![HomeCare Pro](https://img.shields.io/badge/HomeCare-Pro-4f46e5?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=for-the-badge)

---

## 🚀 Features

### Core Features
- ✅ **17+ Professional Services** (Electrician, Plumber, AC Repair, Vehicle Services, etc.)
- ✅ **Vehicle Pickup & Drop** - Doorstep vehicle service with live tracking
- ✅ **₹10 Booking Fee** - Pay only ₹10 to confirm any booking
- ✅ **AI Assistant Chat** - Smart assistant for booking queries (No WhatsApp)
- ✅ **Admin Panel** - Complete management system
- ✅ **Worker Dashboard** - Job management and earnings tracking
- ✅ **User Dashboard** - Booking history and profile management

### Payment & Booking
- UPI, Razorpay, and Cash on Delivery options
- Instant booking confirmation after payment
- Auto-booking approval system
- Payment tracking and history

### UI/UX
- Modern, responsive design
- Dark mode support
- Animated hero section
- Glassmorphism effects
- Mobile-first approach

---

## 🎯 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@homecare.com | admin123 |
| **Worker** | worker@homecare.com | worker123 |
| **User** | user@homecare.com | user123 |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4.1
- **Icons:** Lucide React
- **State Management:** React Context API
- **Data Persistence:** LocalStorage (simulated database)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- VS Code (recommended)

### Step-by-Step Installation

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org)
   - Install LTS version

2. **Open project in VS Code**
   # Open the project folder in VS Code
   # OR use terminal
   cd path/to/project-folder
   code
3. Install Dependencies
npm install
Run Development Server
npm run dev
Open in Browser
Visit: http://localhost:5173
Press <kbd>Ctrl</kbd> + <kbd>Click</kbd> on the link in terminal
🚀 Available Scripts
Command	Description
npm install	Install all dependencies
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
📁 Project Structure
text

src/
├── components/
│   ├── Navbar.tsx          # Main navigation
│   ├── Footer.tsx          # Footer component
│   └── SharedComponents.tsx # Reusable UI components
├── pages/
│   ├── HomePage.tsx        # Landing page
│   ├── AuthPages.tsx       # Login/Register
│   ├── ServicePages.tsx    # Services & Booking
│   ├── UserDashboard.tsx   # User panel
│   ├── AdminDashboard.tsx  # Admin panel
│   ├── WorkerDashboard.tsx # Worker panel
│   └── ContactPage.tsx     # Contact form
├── context/
│   └── AppContext.tsx      # Global state management
├── data/
│   └── mockData.ts         # Mock database
├── types/
│   └── index.ts            # TypeScript types
└── App.tsx                 # Main app component
🎨 Key Pages & Features
1. Home Page
Hero section with service search
Service categories
AI recommendations
Testimonials & FAQ
2. Services Page
Browse all services
Category filters
Search functionality
Service cards with ratings
3. Booking Flow
Select service
Choose date & time
Enter address & phone
Pay ₹10 booking fee
AI Assistant opens automatically
Get booking confirmation
4. AI Assistant Features
Answers booking queries
Provides service details
Handles cancellation/refund info
Smart contextual replies
5. Admin Panel
Dashboard with statistics
Manage users (block/unblock/delete)
Manage services & workers
View bookings & payments
Handle reviews & messages
6. Worker Panel
Accept/reject job assignments
Update job status
View earnings & performance
Toggle availability
🎯 Service Categories
Home Services (₹299-₹699)
Electrician, Plumber, Carpenter, Painter
AC Repair, House Cleaning, Pest Control
Vehicle Services (₹199-₹1499)
Car/Bike Washing
Car Detailing, Bike Servicing
Pickup & Drop Service
Doorstep Vehicle Repair
Appliance Repair (₹299-₹499)
Washing Machine, Refrigerator
TV Repair, Microwave Repair
🤖 AI Assistant Example Queries
Try asking the AI:

"When is my service scheduled?"
"Can I cancel my booking?"
"What is the total cost?"
"How do I pay the remaining amount?"
"What if the worker doesn't arrive?"
🎨 Customization
Change Brand Color
Edit src/index.css:
--color-brand: #4f46e5; /* Change this */
Add New Service
Edit src/data/mockData.ts:
TypeScript
{ 
  id: 's18', 
  name: 'New Service', 
  categoryId: 'home',
  price: 399, 
  emoji: '✨' 
}
🐛 Troubleshooting
Problem: "npm not found"
Solution: Install Node.js and restart VS Code
Problem: Port 5173 already in use
Solution:
npm run dev -- --port 3000
Problem: White screen
Solution:
npm cache clean --force
npm install
npm run dev
📝 License
This project is for educational purposes.
🙋 Support
For issues or questions:
Check the troubleshooting section above
Ensure Node.js is properly installed
Try deleting node_modules and running npm install again
🌟 Key Highlights
⚡ Lightning Fast - Built with Vite
🎨 Beautiful UI - Modern glassmorphism design
📱 Fully Responsive - Works on all devices
🌙 Dark Mode - Eye-friendly theme
🤖 AI Assistant - Smart chatbot integration
💳 Payment Ready - ₹10 booking fee system
Made with ❤️ for HomeCare Pro
