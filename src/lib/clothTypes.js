import 'server-only';
import { connectDB } from '@/lib/db';
import ClothType from '@/models/ClothType';

export function cleanClothTypeName(value) {
  const name = String(value || '').trim().replace(/\s+/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function getClothTypeNames() {
  await connectDB();
  const types = await ClothType.find().sort({ name: 1 }).select('name').lean();
  return types.map((type) => type.name);
}

export async function findOrCreateClothType(value, companyId) {
  const name = cleanClothTypeName(value);
  const key = name.toLowerCase();

  await connectDB();
  return ClothType.findOneAndUpdate(
    { key },
    { $setOnInsert: { name, key, createdBy: companyId } },
    { upsert: true, new: true }
  );
}
