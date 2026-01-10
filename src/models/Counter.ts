import mongoose, { Schema, Document, Model } from 'mongoose';
import { DuckTier } from './Order';

export interface ICounter extends Document {
  name: string;
  value: number;
}

const CounterSchema = new Schema<ICounter>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

// Get next sequential duck numbers for a specific tier
CounterSchema.statics.getNextDuckNumbers = async function(tier: DuckTier, count: number): Promise<string[]> {
  const counterName = `duckNumber_${tier}`;

  const counter = await this.findOneAndUpdate(
    { name: counterName },
    { $inc: { value: count } },
    { new: true, upsert: true }
  );

  const endNumber = counter.value;
  const startNumber = endNumber - count + 1;

  const numbers: string[] = [];
  for (let i = startNumber; i <= endNumber; i++) {
    numbers.push(`${tier}${i}`);
  }

  return numbers;
};

// Get current count for a tier
CounterSchema.statics.getCurrentCount = async function(tier: DuckTier): Promise<number> {
  const counterName = `duckNumber_${tier}`;
  const counter = await this.findOne({ name: counterName });
  return counter?.value || 0;
};

interface CounterModel extends Model<ICounter> {
  getNextDuckNumbers(tier: DuckTier, count: number): Promise<string[]>;
  getCurrentCount(tier: DuckTier): Promise<number>;
}

const Counter: CounterModel = (mongoose.models.Counter as CounterModel) ||
  mongoose.model<ICounter, CounterModel>('Counter', CounterSchema);

export default Counter;
