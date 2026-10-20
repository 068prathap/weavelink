import mongoose from 'mongoose';
import { CLOTH_TYPES, FINISHES, UNITS } from '@/lib/constants';

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    clothType: { type: String, enum: CLOTH_TYPES, required: true },
    clothTypeOther: { type: String, trim: true },
    size: { type: String, required: true, trim: true },
    colours: [{ type: String, trim: true }],
    finish: { type: String, enum: FINISHES, required: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, enum: UNITS, required: true },
    minOrder: { type: Number, required: true, min: 1 },
    stock: { type: Number, min: 0, default: 0 },
    photos: [String],
    description: { type: String, maxlength: 1000 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ clothType: 1, finish: 1, price: 1 });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
