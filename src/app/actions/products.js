'use server';

import mongoose from 'mongoose';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getCurrentCompany } from '@/lib/auth';
import { FINISHES, SIZE_UNITS, UNITS } from '@/lib/constants';
import { cleanClothTypeName, findOrCreateClothType } from '@/lib/clothTypes';
import Product from '@/models/Product';

async function getSeller() {
  const company = await getCurrentCompany();
  if (!company || company.role !== 'seller') redirect('/login');
  return company;
}

function readProduct(formData) {
  return {
    clothType: cleanClothTypeName(formData.get('clothType')),
    width: formData.get('width'),
    height: formData.get('height'),
    sizeUnit: formData.get('sizeUnit'),
    colours: (formData.get('colours') || '')
      .split(',')
      .map((colour) => colour.trim())
      .filter(Boolean),
    finish: formData.get('finish'),
    price: formData.get('price'),
    priceUnit: formData.get('priceUnit'),
    minOrder: formData.get('minOrder'),
    stock: formData.get('stock'),
    description: formData.get('description')?.trim(),
  };
}

function validateProduct(values) {
  const errors = {};
  const price = Number(values.price);
  const minOrder = Number(values.minOrder);
  const stock = Number(values.stock || 0);

  if (!values.clothType) errors.clothType = 'Enter the cloth type';
  else if (values.clothType.length > 40) errors.clothType = 'Cloth type is too long';
  if (!(Number(values.width) > 0)) errors.width = 'Enter the width';
  if (!(Number(values.height) > 0)) errors.height = 'Enter the height';
  if (!SIZE_UNITS.includes(values.sizeUnit)) errors.sizeUnit = 'Choose inch or cm';
  if (!FINISHES.includes(values.finish)) errors.finish = 'Choose raw, dyed or finished';
  if (!values.price || !(price >= 0)) errors.price = 'Enter a valid price';
  if (!UNITS.includes(values.priceUnit)) errors.priceUnit = 'Choose a unit';
  if (!Number.isInteger(minOrder) || minOrder < 1) errors.minOrder = 'Enter the minimum order (1 or more)';
  if (!Number.isInteger(stock) || stock < 0) errors.stock = 'Enter a valid stock count';

  return errors;
}

function toProductData(values, clothTypeId) {
  const { width, height, sizeUnit, ...rest } = values;

  return {
    ...rest,
    clothType: clothTypeId,
    size: { width: Number(width), height: Number(height), unit: sizeUnit },
    price: Number(values.price),
    minOrder: Number(values.minOrder),
    stock: Number(values.stock || 0),
  };
}

export async function saveProduct(prevState, formData) {
  const seller = await getSeller();
  const productId = formData.get('productId');
  const values = readProduct(formData);
  const errors = validateProduct(values);

  if (Object.keys(errors).length > 0) {
    return { errors, values: { ...values, colours: values.colours.join(', ') } };
  }

  if (productId && !mongoose.isValidObjectId(productId)) redirect('/dashboard');

  const clothType = await findOrCreateClothType(values.clothType, seller._id);
  const data = toProductData(values, clothType._id);

  if (productId) {
    const result = await Product.updateOne({ _id: productId, seller: seller._id }, data);
    if (result.matchedCount === 0) redirect('/dashboard');
  } else {
    await Product.create({ ...data, seller: seller._id });
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function toggleProduct(formData) {
  const seller = await getSeller();
  const productId = formData.get('productId');
  if (!mongoose.isValidObjectId(productId)) return;

  const product = await Product.findOne({ _id: productId, seller: seller._id });
  if (!product) return;

  product.isActive = !product.isActive;
  await product.save();
  revalidatePath('/dashboard');
}
