import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  donorName: string;
  phone: string;
  email: string;
  address: string;
  amount: number;
  paymentMethod: 'cash' | 'venmo' | 'paypal';
  donationDate: Date;
  notes: string;
  anonymous: boolean;
}

const DonationSchema = new Schema<IDonation>({
  donorName: {
    type: String,
    required: [true, 'Donor name is required'],
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
    default: '',
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Minimum donation is $1'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['cash', 'venmo', 'paypal'],
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Prevent model recompilation in development
const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);

export default Donation;
