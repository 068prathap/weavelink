import mongoose from 'mongoose';
import { QUOTE_STATUS, UNITS } from '@/lib/constants';

const quoteSchema = new mongoose.Schema(
  {
    requirement: { type: mongoose.Schema.Types.ObjectId, ref: 'Requirement', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, enum: UNITS, required: true },
    quantity: { type: Number, required: true, min: 1 },
    deliveryDays: { type: Number, required: true, min: 1 },
    sampleAvailable: { type: Boolean, default: false },
    message: { type: String, maxlength: 500 },
    status: { type: String, enum: QUOTE_STATUS, default: 'sent' },
  },
  { timestamps: true }
);

quoteSchema.index({ requirement: 1, seller: 1 }, { unique: true });

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
