import mongoose from 'mongoose';
import { CLOTH_TYPES, GST_STATUS, PHONE_PATTERN, ROLES } from '@/lib/constants';
import { isValidGstin } from '@/lib/gstin';

const companySchema = new mongoose.Schema(
  {
    role: { type: String, enum: ROLES, required: true, immutable: true },
    companyName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, match: PHONE_PATTERN },
    whatsapp: { type: String, match: PHONE_PATTERN },
    passwordHash: { type: String, required: true, select: false },
    location: {
      town: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      state: { type: String, default: 'Tamil Nadu' },
    },
    photos: [String],
    about: { type: String, maxlength: 1000 },
    yearsInBusiness: { type: Number, min: 0 },

    gstin: {
      type: String,
      uppercase: true,
      trim: true,
      validate: {
        validator: (value) => !value || isValidGstin(value),
        message: 'Invalid GSTIN',
      },
    },
    gstStatus: { type: String, enum: GST_STATUS, default: 'none' },
    gstRejectReason: String,

    looms: { type: Number, min: 0 },
    monthlyCapacity: { type: Number, min: 0 },
    specialities: [{ type: String, enum: CLOTH_TYPES }],

    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

companySchema.pre('save', function () {
  if (this.isModified('gstin')) {
    this.gstStatus = this.gstin ? 'pending' : 'none';
    this.gstRejectReason = undefined;
  }
});

export default mongoose.models.Company || mongoose.model('Company', companySchema);
