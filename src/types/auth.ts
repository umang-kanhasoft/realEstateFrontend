export enum UserRole {
  ADMIN = 'admin',
  BUILDER = 'builder',
  BUYER = 'buyer',
  AUTHOR = 'author',
  CUSTOMER = 'customer',
}

export enum SubscriptionType {
  MARKET_INSIGHTS = 'market_insights',
  PRICE_ALERTS = 'price_alerts',
  NEWS_UPDATES = 'news_updates',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole[];
  phoneNumber?: string;
  isVerified: boolean;
  profileImageUrl?: string;
  bio?: string;
  specialization?: string;
  yearsOfExperience?: number;
  subscriptionType?: SubscriptionType;
  subscriptionStatus?: SubscriptionStatus;
}
