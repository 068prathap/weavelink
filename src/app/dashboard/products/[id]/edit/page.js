import mongoose from 'mongoose';
import { notFound, redirect } from 'next/navigation';
import { getCurrentCompany } from '@/lib/auth';
import { getClothTypeNames } from '@/lib/clothTypes';
import Product from '@/models/Product';
import ProductForm from '@/components/ProductForm/ProductForm';
import styles from '@/styles/form.module.scss';

export const metadata = {
  title: 'Edit product',
};

export default async function EditProductPage({ params }) {
  const company = await getCurrentCompany();
  if (!company) redirect('/login');
  if (company.role !== 'seller') redirect('/dashboard');

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  const product = await Product.findOne({ _id: id, seller: company._id }).populate('clothType', 'name').lean();
  if (!product) notFound();

  const clothTypes = await getClothTypeNames();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Edit product</h1>
      <ProductForm
        clothTypes={clothTypes}
        product={{
          id: product._id.toString(),
          clothType: product.clothType?.name,
          width: product.size?.width,
          height: product.size?.height,
          sizeUnit: product.size?.unit || 'inch',
          colours: product.colours.join(', '),
          finish: product.finish,
          price: product.price,
          priceUnit: product.priceUnit,
          minOrder: product.minOrder,
          stock: product.stock,
          description: product.description,
        }}
      />
    </main>
  );
}
