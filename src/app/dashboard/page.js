import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentCompany } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import Product from '@/models/Product';
import GstBadge from '@/components/GstBadge/GstBadge';
import ProductList from '@/components/ProductList/ProductList';
import styles from './page.module.scss';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const company = await getCurrentCompany();
  if (!company) redirect('/login');

  const isSeller = company.role === 'seller';
  const products = isSeller ? await Product.find({ seller: company._id }).populate('clothType', 'name').sort({ createdAt: -1 }).lean() : [];

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Welcome, {company.ownerName}</h1>
      <p className={styles.company}>
        {company.companyName}, {company.location.town}
      </p>
      <div className={styles.meta}>
        <span className={styles.role}>{isSeller ? 'Seller' : 'Dealer'}</span>
        <GstBadge status={company.gstStatus} />
      </div>
      {company.gstStatus === 'rejected' && company.gstRejectReason && (
        <p className={styles.reason}>GST not approved: {company.gstRejectReason}</p>
      )}

      {isSeller && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>My products</h2>
            <Link href="/dashboard/products/new" className={styles.add}>
              + Add product
            </Link>
          </div>
          <ProductList products={products} />
        </section>
      )}

      <form action={logout}>
        <button type="submit" className={styles.logout}>
          Logout
        </button>
      </form>
    </main>
  );
}
