export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    referralCode?: string;
    avatar?: string | null;
    quotes?: string | null;
    role: 'USER' | 'ORGANIZER';
    points: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface AuthUser {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}



export interface TicketTier {
    name: string;
    price: number;
    totalSeats: number;
  }
  
  export interface Voucher {
    voucherName: string;
    discountAmount: number;
    expiryDate: string;
  }
  
  export interface EventValues {
    eventName: string;
    description: string;
    date: string;
    time: string;
    location: string;
    city: string;
    eventType: string;
    category: string;
    ticketTiers: TicketTier[];
    vouchers: Voucher[];
    referralQuota: number;
    eventPicture: string;
  }
  

export interface Category{
  image?: string;
  category: string;
}