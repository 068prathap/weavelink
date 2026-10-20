import 'server-only';
import { getSession } from '@/lib/session';
import { connectDB } from '@/lib/db';
import Company from '@/models/Company';

export async function getCurrentCompany() {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const company = await Company.findById(session.id).lean();
  if (!company || company.isBlocked) return null;

  return company;
}
