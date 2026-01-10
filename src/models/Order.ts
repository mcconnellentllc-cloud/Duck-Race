import mongoose, { Schema, Document, Model } from 'mongoose';

export type DuckTier = 'A' | 'B' | 'C' | 'D';

export interface DuckEntry {
  tier: DuckTier;
  quantity: number;
  duckNumbers: string[];
}

export interface IOrder extends Document {
  buyerName: string;
  phone: string;
  email: string;
  address: string;
  ducks: DuckEntry[];
  totalDucks: number;
  amountPaid: number;
  paymentMethod: 'cash' | 'check' | 'venmo';
  purchaseDate: Date;
  notes: string;
}

// Tier configuration
export const TIER_CONFIG = {
  A: { price: 10, winnerPercent: 30, scholarshipPercent: 70, label: '$10 Duck' },
  B: { price: 25, winnerPercent: 35, scholarshipPercent: 65, label: '$25 Duck' },
  C: { price: 50, winnerPercent: 40, scholarshipPercent: 60, label: '$50 Duck' },
  D: { price: 100, winnerPercent: 50, scholarshipPercent: 50, label: '$100 Duck' },
} as const;

const DuckEntrySchema = new Schema({
  tier: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  duckNumbers: {
    type: [String],
    required: true,
  },
});

const OrderSchema = new Schema<IOrder>({
  buyerName: {
    type: String,
    required: [true, 'Buyer name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  ducks: {
    type: [DuckEntrySchema],
    required: true,
  },
  totalDucks: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['cash', 'venmo', 'paypal'],
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true,
});

// Prevent model recompilation in development
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
