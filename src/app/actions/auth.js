'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import { isValidGstin } from '@/lib/gstin';
import { PHONE_PATTERN, ROLES } from '@/lib/constants';
import Company from '@/models/Company';

function cleanPhone(value) {
  return String(value || '').replace(/\D/g, '').slice(-10);
}

export async function signup(prevState, formData) {
  const values = {
    role: formData.get('role'),
    companyName: formData.get('companyName')?.trim(),
    ownerName: formData.get('ownerName')?.trim(),
    phone: cleanPhone(formData.get('phone')),
    town: formData.get('town')?.trim(),
    district: formData.get('district')?.trim(),
    gstin: formData.get('gstin')?.trim().toUpperCase(),
  };
  const password = formData.get('password') || '';

  const errors = {};
  if (!ROLES.includes(values.role)) errors.role = 'Choose seller or dealer';
  if (!values.companyName) errors.companyName = 'Enter your company name';
  if (!values.ownerName) errors.ownerName = 'Enter the owner name';
  if (!PHONE_PATTERN.test(values.phone)) errors.phone = 'Enter a valid 10 digit mobile number';
  if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (!values.town) errors.town = 'Enter your town';
  if (!values.district) errors.district = 'Enter your district';
  if (values.gstin && !isValidGstin(values.gstin)) errors.gstin = 'This GSTIN is not valid';

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  await connectDB();

  const exists = await Company.exists({ phone: values.phone });
  if (exists) {
    return { errors: { phone: 'This number is already registered. Please login.' }, values };
  }

  const company = await Company.create({
    role: values.role,
    companyName: values.companyName,
    ownerName: values.ownerName,
    phone: values.phone,
    whatsapp: values.phone,
    passwordHash: await bcrypt.hash(password, 10),
    location: { town: values.town, district: values.district },
    gstin: values.gstin || undefined,
  });

  await createSession(company);
  redirect('/dashboard');
}

export async function login(prevState, formData) {
  const phone = cleanPhone(formData.get('phone'));
  const password = formData.get('password') || '';

  if (!PHONE_PATTERN.test(phone) || !password) {
    return { error: 'Enter your mobile number and password', phone };
  }

  await connectDB();

  const company = await Company.findOne({ phone }).select('+passwordHash');
  const passwordMatches = company && (await bcrypt.compare(password, company.passwordHash));

  if (!passwordMatches) {
    return { error: 'Wrong mobile number or password', phone };
  }

  if (company.isBlocked) {
    return { error: 'This account is blocked. Please contact WeaveLink.', phone };
  }

  await createSession(company);
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/');
}
