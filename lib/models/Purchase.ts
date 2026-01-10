import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPurchase extends Document {
  buyerName: string;
  phone: string;
  email: string;
  address: string;
  tier: 10 | 25 | 50 | 100;
  numDucks: number;
  amountPaid: number;
  paymentMethod: 'cash' | 'check' | 'venmo' | 'paypal' | 'other';
  purchaseDate: Date;
  notes: string;
  duckNumbers: number[];
}

const PurchaseSchema = new Schema<IPurchase>({
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
  tier: {
    type: Number,
    required: [true, 'Tier is required'],
    enum: [10, 25, 50, 100],
  },
  numDucks: {
    type: Number,
    required: [true, 'Number of ducks is required'],
    min: [1, 'Must purchase at least 1 duck'],
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['cash', 'check', 'venmo', 'paypal', 'other'],
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
  duckNumbers: {
    type: [Number],
    default: [],
  },
}, {
  timestamps: true,
});

const Purchase: Model<IPurchase> = mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);

export default Purchase;
