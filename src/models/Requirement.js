import mongoose from 'mongoose';
import '@/models/ClothType';
import { FINISHES, REQUIREMENT_STATUS, SIZE_UNITS, UNITS } from '@/lib/constants';

const requirementSchema = new mongoose.Schema(
  {
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    clothType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothType', required: true },
    size: {
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
      unit: { type: String, enum: SIZE_UNITS, default: 'inch' },
    },
    colours: [{ type: String, trim: true }],
    finish: { type: String, enum: FINISHES },
    quantity: { type: Number, required: true, min: 1 },
    quantityUnit: { type: String, enum: UNITS, default: 'piece' },
    budget: { type: Number, min: 0 },
    neededBy: { type: Date, required: true },
    deliveryLocation: { type: String, required: true, trim: true },
    notes: { type: String, maxlength: 1000 },
    status: { type: String, enum: REQUIREMENT_STATUS, default: 'open' },
  },
  { timestamps: true }
);

requirementSchema.index({ status: 1, clothType: 1, neededBy: 1 });

export default mongoose.models.Requirement || mongoose.model('Requirement', requirementSchema);
