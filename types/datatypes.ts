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