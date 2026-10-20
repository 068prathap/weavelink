import mongoose from 'mongoose';
import '@/models/ClothType';
import { FINISHES, SIZE_UNITS, UNITS } from '@/lib/constants';

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    clothType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothType', required: true },
    size: {
      width: { type: Number, required: true, min: 0 },
      height: { type: Number, required: true, min: 0 },
      unit: { type: String, enum: SIZE_UNITS, default: 'inch' },
    },
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
