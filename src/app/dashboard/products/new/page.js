import { redirect } from 'next/navigation';
import { getCurrentCompany } from '@/lib/auth';
import { getClothTypeNames } from '@/lib/clothTypes';
import ProductForm from '@/components/ProductForm/ProductForm';
import styles from '@/styles/form.module.scss';

export const metadata = {
  title: 'Add product',
};

export default async function NewProductPage() {
  const company = await getCurrentCompany();
  if (!company) redirect('/login');
  if (company.role !== 'seller') redirect('/dashboard');

  const clothTypes = await getClothTypeNames();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Add product</h1>
      <ProductForm clothTypes={clothTypes} />
    </main>
  );
}
