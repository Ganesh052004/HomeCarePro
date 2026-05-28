export type UserRole = 'user' | 'admin' | 'worker';
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type PaymentMethod = 'razorpay' | 'upi' | 'cod';
export type VehicleBookingStatus = 'requested' | 'pickup-scheduled' | 'picked-up' | 'in-service' | 'ready' | 'delivered';
export type MessageStatus = 'unread' | 'read' | 'replied';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  address: string;
  avatar: string;
  isBlocked: boolean;
  createdAt: string;
  favoriteServices?: string[];
  referralCode?: string;
  referredBy?: string;
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  description: string;
  duration: string;
  emoji: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  phone: string;
  status: BookingStatus;
  workerId?: string;
  workerName?: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  rating?: number;
  review?: string;
  createdAt: string;
  couponUsed?: string;
  discount?: number;
}

export interface VehicleBooking {
  id: string;
  userId: string;
  userName: string;
  vehicleType: 'car' | 'bike';
  vehicleNumber: string;
  pickupAddress: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  status: VehicleBookingStatus;
  assignedAgent?: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  createdAt: string;
  notes?: string;
  timeline: { status: VehicleBookingStatus; timestamp: string; note?: string }[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  review: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: MessageStatus;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'promotion' | 'system';
  isRead: boolean;
  date: string;
}

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  rating: number;
  totalJobs: number;
  completedJobs: number;
  earnings: number;
  isAvailable: boolean;
  avatar: string;
  currentJob?: string;
  joinedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  amount: number;
  method: PaymentMethod;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  date: string;
  transactionId: string;
}
