import { User, Service, ServiceCategory, Booking, VehicleBooking, Review, ContactMessage, Notification, Worker, Coupon, Payment } from '../types';

export const defaultCategories: ServiceCategory[] = [
  { id: 'home', name: 'Home Services', emoji: '🏠', color: 'from-blue-500 to-cyan-500', description: 'Complete home maintenance & repair' },
  { id: 'vehicle', name: 'Vehicle Services', emoji: '🚗', color: 'from-green-500 to-emerald-500', description: 'Doorstep vehicle care & repair' },
  { id: 'appliance', name: 'Appliance Repair', emoji: '🔧', color: 'from-purple-500 to-pink-500', description: 'Expert appliance repair services' },
];

export const defaultServices: Service[] = [
  { id: 's1', name: 'Electrician', categoryId: 'home', price: 299, originalPrice: 499, description: 'Expert electrical repairs, wiring, fan & light installation, MCB replacement and all electrical work at your doorstep.', duration: '1-2 hrs', emoji: '⚡', rating: 4.7, reviewCount: 234, isAvailable: true },
  { id: 's2', name: 'Plumber', categoryId: 'home', price: 349, originalPrice: 549, description: 'Professional plumbing services including pipe repair, tap fixing, leakage repair, bathroom fitting and more.', duration: '1-2 hrs', emoji: '🔧', rating: 4.6, reviewCount: 189, isAvailable: true },
  { id: 's3', name: 'Carpenter', categoryId: 'home', price: 399, originalPrice: 599, description: 'Skilled carpentry work - furniture repair, door fixing, shelf installation, modular kitchen work.', duration: '2-4 hrs', emoji: '🪚', rating: 4.5, reviewCount: 156, isAvailable: true },
  { id: 's4', name: 'Painter', categoryId: 'home', price: 499, originalPrice: 799, description: 'Professional wall painting, texture painting, POP work, waterproofing and decorative painting.', duration: '4-8 hrs', emoji: '🎨', rating: 4.8, reviewCount: 203, isAvailable: true },
  { id: 's5', name: 'AC Repair', categoryId: 'home', price: 449, originalPrice: 699, description: 'AC servicing, gas refill, compressor repair, installation and deep cleaning for all AC brands.', duration: '1-2 hrs', emoji: '❄️', rating: 4.6, reviewCount: 312, isAvailable: true },
  { id: 's6', name: 'House Cleaning', categoryId: 'home', price: 599, originalPrice: 999, description: 'Complete house deep cleaning, bathroom cleaning, kitchen cleaning, sofa & carpet cleaning.', duration: '3-5 hrs', emoji: '🧹', rating: 4.7, reviewCount: 445, isAvailable: true },
  { id: 's7', name: 'Pest Control', categoryId: 'home', price: 699, originalPrice: 999, description: 'Cockroach, termite, bed bug, rodent and mosquito control. Safe for family and pets.', duration: '1-2 hrs', emoji: '🐛', rating: 4.4, reviewCount: 178, isAvailable: true },
  { id: 's8', name: 'Car Washing', categoryId: 'vehicle', price: 399, originalPrice: 599, description: 'Exterior wash, interior vacuum, dashboard cleaning, tyre shine and air freshener.', duration: '45 min', emoji: '🚿', rating: 4.6, reviewCount: 289, isAvailable: true },
  { id: 's9', name: 'Bike Washing', categoryId: 'vehicle', price: 199, originalPrice: 299, description: 'Complete bike wash, chain lubrication, dashboard polish and tyre shine.', duration: '30 min', emoji: '🏍️', rating: 4.5, reviewCount: 167, isAvailable: true },
  { id: 's10', name: 'Car Detailing', categoryId: 'vehicle', price: 1499, originalPrice: 2499, description: 'Premium car detailing with paint correction, ceramic coating, interior deep clean and odour removal.', duration: '3-4 hrs', emoji: '✨', rating: 4.9, reviewCount: 134, isAvailable: true },
  { id: 's11', name: 'Bike Servicing', categoryId: 'vehicle', price: 599, originalPrice: 899, description: 'Engine oil change, brake adjustment, chain lubrication, full bike check-up and tune-up.', duration: '1-2 hrs', emoji: '🔩', rating: 4.5, reviewCount: 201, isAvailable: true },
  { id: 's12', name: 'Doorstep Vehicle Repair', categoryId: 'vehicle', price: 799, originalPrice: 1199, description: 'On-site vehicle repair - battery replacement, puncture repair, dent removal, mechanical fixes.', duration: '1-3 hrs', emoji: '🛠️', rating: 4.4, reviewCount: 98, isAvailable: true },
  { id: 's13', name: 'Pickup & Drop Service', categoryId: 'vehicle', price: 999, originalPrice: 1499, description: 'We pick up your vehicle, get it serviced at our center and deliver back to your doorstep.', duration: '1-2 days', emoji: '🚛', rating: 4.7, reviewCount: 156, isAvailable: true },
  { id: 's14', name: 'Washing Machine Repair', categoryId: 'appliance', price: 399, originalPrice: 599, description: 'Repair for all brands - drum issues, motor repair, water leakage, control panel problems.', duration: '1-2 hrs', emoji: '🫧', rating: 4.5, reviewCount: 145, isAvailable: true },
  { id: 's15', name: 'Refrigerator Repair', categoryId: 'appliance', price: 449, originalPrice: 699, description: 'Cooling issues, gas refill, thermostat repair, compressor replacement for all fridge brands.', duration: '1-2 hrs', emoji: '🧊', rating: 4.6, reviewCount: 178, isAvailable: true },
  { id: 's16', name: 'TV Repair', categoryId: 'appliance', price: 499, originalPrice: 799, description: 'LED/LCD/Smart TV repair - screen issues, sound problems, motherboard repair, wall mounting.', duration: '1-2 hrs', emoji: '📺', rating: 4.4, reviewCount: 123, isAvailable: true },
  { id: 's17', name: 'Microwave Repair', categoryId: 'appliance', price: 299, originalPrice: 499, description: 'All types of microwave repair - not heating, turntable issue, display problem, sparking.', duration: '30-60 min', emoji: '📡', rating: 4.3, reviewCount: 89, isAvailable: true },
];

export const defaultUsers: User[] = [
  { id: 'admin1', name: 'Admin User', email: 'admin@homecare.com', phone: '9876543210', password: 'admin123', role: 'admin', address: 'HomeCare Office, Mumbai', avatar: '👨‍💼', isBlocked: false, createdAt: '2024-01-01', referralCode: 'ADMIN001' },
  { id: 'worker1', name: 'Rajesh Kumar', email: 'worker@homecare.com', phone: '9876543211', password: 'worker123', role: 'worker', address: 'Andheri, Mumbai', avatar: '👷', isBlocked: false, createdAt: '2024-01-15' },
  { id: 'worker2', name: 'Suresh Patil', email: 'worker2@homecare.com', phone: '9876543212', password: 'worker123', role: 'worker', address: 'Bandra, Mumbai', avatar: '👨‍🔧', isBlocked: false, createdAt: '2024-02-01' },
  { id: 'worker3', name: 'Amit Sharma', email: 'worker3@homecare.com', phone: '9876543213', password: 'worker123', role: 'worker', address: 'Thane, Mumbai', avatar: '🧑‍🔧', isBlocked: false, createdAt: '2024-03-01' },
  { id: 'user1', name: 'Priya Sharma', email: 'user@homecare.com', phone: '9876543214', password: 'user123', role: 'user', address: 'Flat 301, Palm Residency, Andheri West, Mumbai - 400053', avatar: '👩', isBlocked: false, createdAt: '2024-02-10', favoriteServices: ['s1', 's6'], referralCode: 'PRIYA01' },
  { id: 'user2', name: 'Vikram Singh', email: 'vikram@email.com', phone: '9876543215', password: 'user123', role: 'user', address: 'B-204, Sunrise Apartments, Bandra East, Mumbai - 400051', avatar: '👨', isBlocked: false, createdAt: '2024-03-05', favoriteServices: ['s8', 's10'], referralCode: 'VIKRAM02' },
  { id: 'user3', name: 'Anita Desai', email: 'anita@email.com', phone: '9876543216', password: 'user123', role: 'user', address: 'C-102, Green Park Society, Thane West, Mumbai - 400601', avatar: '👩‍💼', isBlocked: false, createdAt: '2024-03-20', favoriteServices: ['s15', 's14'], referralCode: 'ANITA03' },
];

export const defaultWorkers: Worker[] = [
  { id: 'worker1', name: 'Rajesh Kumar', email: 'worker@homecare.com', phone: '9876543211', skills: ['Electrician', 'Plumber'], rating: 4.7, totalJobs: 156, completedJobs: 148, earnings: 78500, isAvailable: true, avatar: '👷', joinedAt: '2024-01-15' },
  { id: 'worker2', name: 'Suresh Patil', email: 'worker2@homecare.com', phone: '9876543212', skills: ['AC Repair', 'Washing Machine Repair', 'Refrigerator Repair'], rating: 4.5, totalJobs: 98, completedJobs: 92, earnings: 52300, isAvailable: true, avatar: '👨‍🔧', joinedAt: '2024-02-01' },
  { id: 'worker3', name: 'Amit Sharma', email: 'worker3@homecare.com', phone: '9876543213', skills: ['Painter', 'Carpenter', 'House Cleaning'], rating: 4.6, totalJobs: 120, completedJobs: 115, earnings: 64200, isAvailable: true, avatar: '🧑‍🔧', joinedAt: '2024-03-01' },
];

export const defaultBookings: Booking[] = [
  { id: 'b1', userId: 'user1', userName: 'Priya Sharma', serviceId: 's1', serviceName: 'Electrician', date: '2025-01-20', time: '10:00 AM', address: 'Flat 301, Palm Residency, Andheri West', phone: '9876543214', status: 'completed', workerId: 'worker1', workerName: 'Rajesh Kumar', totalAmount: 299, paymentStatus: 'paid', paymentMethod: 'upi', rating: 5, review: 'Excellent work! Very professional and punctual.', createdAt: '2025-01-18' },
  { id: 'b2', userId: 'user1', userName: 'Priya Sharma', serviceId: 's6', serviceName: 'House Cleaning', date: '2025-01-25', time: '09:00 AM', address: 'Flat 301, Palm Residency, Andheri West', phone: '9876543214', status: 'approved', workerId: 'worker3', workerName: 'Amit Sharma', totalAmount: 599, paymentStatus: 'paid', paymentMethod: 'razorpay', createdAt: '2025-01-22' },
  { id: 'b3', userId: 'user2', userName: 'Vikram Singh', serviceId: 's8', serviceName: 'Car Washing', date: '2025-01-28', time: '08:00 AM', address: 'B-204, Sunrise Apartments, Bandra East', phone: '9876543215', status: 'pending', totalAmount: 399, paymentStatus: 'pending', paymentMethod: 'cod', createdAt: '2025-01-26' },
  { id: 'b4', userId: 'user2', userName: 'Vikram Singh', serviceId: 's10', serviceName: 'Car Detailing', date: '2025-02-01', time: '10:00 AM', address: 'B-204, Sunrise Apartments, Bandra East', phone: '9876543215', status: 'pending', totalAmount: 1499, paymentStatus: 'pending', paymentMethod: 'razorpay', createdAt: '2025-01-27' },
  { id: 'b5', userId: 'user3', userName: 'Anita Desai', serviceId: 's15', serviceName: 'Refrigerator Repair', date: '2025-01-22', time: '03:00 PM', address: 'C-102, Green Park Society, Thane West', phone: '9876543216', status: 'in-progress', workerId: 'worker2', workerName: 'Suresh Patil', totalAmount: 449, paymentStatus: 'paid', paymentMethod: 'upi', createdAt: '2025-01-20' },
];

export const defaultVehicleBookings: VehicleBooking[] = [
  { id: 'v1', userId: 'user2', userName: 'Vikram Singh', vehicleType: 'car', vehicleNumber: 'MH02AB1234', pickupAddress: 'B-204, Sunrise Apartments, Bandra East', preferredDate: '2025-01-30', preferredTime: '09:00 AM', serviceType: 'Full Service + Detailing', status: 'pickup-scheduled', assignedAgent: 'Rajesh Kumar', totalAmount: 2499, paymentStatus: 'paid', createdAt: '2025-01-25', timeline: [{ status: 'requested', timestamp: '2025-01-25 10:30 AM' }, { status: 'pickup-scheduled', timestamp: '2025-01-25 11:00 AM', note: 'Agent Rajesh assigned for pickup' }] },
  { id: 'v2', userId: 'user1', userName: 'Priya Sharma', vehicleType: 'bike', vehicleNumber: 'MH01CD5678', pickupAddress: 'Flat 301, Palm Residency, Andheri West', preferredDate: '2025-02-02', preferredTime: '10:00 AM', serviceType: 'Bike Servicing', status: 'requested', totalAmount: 599, paymentStatus: 'pending', createdAt: '2025-01-28', timeline: [{ status: 'requested', timestamp: '2025-01-28 02:15 PM' }] },
];

export const defaultReviews: Review[] = [
  { id: 'r1', userId: 'user1', userName: 'Priya Sharma', userAvatar: '👩', serviceId: 's1', serviceName: 'Electrician', rating: 5, review: 'Excellent work! Very professional and punctual. Fixed all electrical issues in my apartment. Highly recommended!', date: '2025-01-21' },
  { id: 'r2', userId: 'user2', userName: 'Vikram Singh', userAvatar: '👨', serviceId: 's8', serviceName: 'Car Washing', rating: 4, review: 'Good service, car looks almost new. Minor area missed near the wheel arches. Overall satisfied.', date: '2025-01-15' },
  { id: 'r3', userId: 'user3', userName: 'Anita Desai', userAvatar: '👩‍💼', serviceId: 's15', serviceName: 'Refrigerator Repair', rating: 5, review: 'My fridge was not cooling properly. Suresh fixed it within 30 minutes. Very knowledgeable technician.', date: '2025-01-10' },
  { id: 'r4', userId: 'user1', userName: 'Priya Sharma', userAvatar: '👩', serviceId: 's6', serviceName: 'House Cleaning', rating: 5, review: 'Amazing deep cleaning service! The team was thorough and professional. Kitchen and bathrooms sparkle now!', date: '2025-01-05' },
  { id: 'r5', userId: 'user2', userName: 'Vikram Singh', userAvatar: '👨', serviceId: 's10', serviceName: 'Car Detailing', rating: 5, review: 'Premium car detailing was worth every penny. Ceramic coating looks fantastic. Will book again!', date: '2024-12-28' },
  { id: 'r6', userId: 'user3', userName: 'Anita Desai', userAvatar: '👩‍💼', serviceId: 's5', serviceName: 'AC Repair', rating: 4, review: 'AC is cooling well after the service. Technician was polite and explained everything clearly.', date: '2024-12-20' },
];

export const defaultContactMessages: ContactMessage[] = [
  { id: 'm1', name: 'Rahul Verma', email: 'rahul@email.com', phone: '9988776655', subject: 'Service Quality Issue', message: 'I had an issue with the plumber who came yesterday. He did not fix the leakage properly. Please send someone again.', date: '2025-01-26', status: 'unread' },
  { id: 'm2', name: 'Meena Iyer', email: 'meena@email.com', phone: '9988776656', subject: 'Partnership Inquiry', message: 'I run a cleaning supplies business. Would like to discuss partnership opportunities with HomeCare Pro.', date: '2025-01-24', status: 'read' },
  { id: 'm3', name: 'Deepak Joshi', email: 'deepak@email.com', phone: '9988776657', subject: 'Refund Request', message: 'I cancelled my booking #b3 but have not received my refund yet. Please process it at the earliest.', date: '2025-01-22', status: 'replied' },
];

export const defaultCoupons: Coupon[] = [
  { id: 'c1', code: 'WELCOME50', discount: 50, type: 'percentage', minOrder: 299, maxDiscount: 200, expiryDate: '2025-12-31', isActive: true, description: '50% off on your first booking (max ₹200)' },
  { id: 'c2', code: 'SAVE100', discount: 100, type: 'fixed', minOrder: 500, maxDiscount: 100, expiryDate: '2025-06-30', isActive: true, description: 'Flat ₹100 off on orders above ₹500' },
  { id: 'c3', code: 'VEHICLE20', discount: 20, type: 'percentage', minOrder: 500, maxDiscount: 300, expiryDate: '2025-09-30', isActive: true, description: '20% off on all vehicle services (max ₹300)' },
  { id: 'c4', code: 'CLEAN200', discount: 200, type: 'fixed', minOrder: 1000, maxDiscount: 200, expiryDate: '2025-04-30', isActive: true, description: 'Flat ₹200 off on deep cleaning packages above ₹1000' },
];

export const defaultNotifications: Notification[] = [
  { id: 'n1', userId: 'user1', title: 'Booking Confirmed', message: 'Your House Cleaning booking on Jan 25 has been confirmed. Worker: Amit Sharma.', type: 'booking', isRead: false, date: '2025-01-22' },
  { id: 'n2', userId: 'user1', title: 'Payment Successful', message: 'Payment of ₹599 received for House Cleaning service via Razorpay.', type: 'payment', isRead: true, date: '2025-01-22' },
  { id: 'n3', userId: 'user1', title: 'Special Offer!', message: 'Get 20% off on AC services this summer. Use code AC20 at checkout.', type: 'promotion', isRead: false, date: '2025-01-20' },
  { id: 'n4', userId: 'user2', title: 'Vehicle Pickup Scheduled', message: 'Your vehicle pickup is scheduled for Jan 30, 9:00 AM. Agent: Rajesh Kumar.', type: 'booking', isRead: false, date: '2025-01-25' },
];

export const defaultPayments: Payment[] = [
  { id: 'p1', bookingId: 'b1', userId: 'user1', userName: 'Priya Sharma', amount: 299, method: 'upi', status: 'success', date: '2025-01-19', transactionId: 'TXN20250119001' },
  { id: 'p2', bookingId: 'b2', userId: 'user1', userName: 'Priya Sharma', amount: 599, method: 'razorpay', status: 'success', date: '2025-01-22', transactionId: 'TXN20250122001' },
  { id: 'p3', bookingId: 'v1', userId: 'user2', userName: 'Vikram Singh', amount: 2499, method: 'razorpay', status: 'success', date: '2025-01-25', transactionId: 'TXN20250125001' },
];

export interface StoreData {
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
}

export const getInitialData = (): StoreData => {
  const stored = localStorage.getItem('homecare_data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem('homecare_data');
    }
  }
  return {
    users: defaultUsers,
    services: defaultServices,
    categories: defaultCategories,
    bookings: defaultBookings,
    vehicleBookings: defaultVehicleBookings,
    reviews: defaultReviews,
    contactMessages: defaultContactMessages,
    notifications: defaultNotifications,
    workers: defaultWorkers,
    coupons: defaultCoupons,
    payments: defaultPayments,
  };
};

export const saveData = (data: StoreData) => {
  localStorage.setItem('homecare_data', JSON.stringify(data));
};

export const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
