import Link from 'next/link';
import { toggleProduct } from '@/app/actions/products';
import { finishLabels, sizeText, unitLabels } from '@/lib/labels';
import styles from './ProductList.module.scss';

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className={styles.empty}>You have not added any products yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => {
        const id = product._id.toString();

        return (
          <li key={id} className={`${styles.item} ${product.isActive ? '' : styles.hidden}`}>
            <div className={styles.info}>
              <h3>
                {product.clothType?.name} <span>{sizeText(product.size)}</span>
              </h3>
              <p className={styles.price}>
                ₹{product.price} / {unitLabels[product.priceUnit]}
              </p>
              <p className={styles.meta}>
                {finishLabels[product.finish]}, min order {product.minOrder}, stock {product.stock}
              </p>
              {product.colours.length > 0 && <p className={styles.meta}>{product.colours.join(', ')}</p>}
              {!product.isActive && <p className={styles.hiddenLabel}>Hidden from dealers</p>}
            </div>
            <div className={styles.buttons}>
              <Link href={`/dashboard/products/${id}/edit`} className={styles.button}>
                Edit
              </Link>
              <form action={toggleProduct}>
                <input type="hidden" name="productId" value={id} />
                <button type="submit" className={styles.button}>
                  {product.isActive ? 'Hide' : 'Show'}
                </button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
