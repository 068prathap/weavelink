'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { saveProduct } from '@/app/actions/products';
import { FINISHES, SIZE_UNITS, UNITS } from '@/lib/constants';
import { finishLabels, unitLabels } from '@/lib/labels';
import Field from '@/components/Field/Field';
import styles from '@/styles/form.module.scss';

const emptyProduct = { finish: 'raw', priceUnit: 'piece', sizeUnit: 'inch' };

function ProductForm({ product, clothTypes }) {
  const [state, formAction, isPending] = useActionState(saveProduct, {
    errors: {},
    values: product || emptyProduct,
  });
  const { errors = {}, values = {} } = state;

  return (
    <form action={formAction} className={styles.form} noValidate>
      {product && <input type="hidden" name="productId" value={product.id} />}

      <Field
        label="Cloth type"
        name="clothType"
        list="clothTypeOptions"
        defaultValue={values.clothType}
        error={errors.clothType}
        maxLength={40}
        autoComplete="off"
        placeholder="Gamcha towel"
        hint="Pick from the list or type a new one"
      />
      <datalist id="clothTypeOptions">
        {clothTypes.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      <div className={styles.sizeRow}>
        <Field label="Width" name="width" type="number" inputMode="decimal" min="0" step="0.1" defaultValue={values.width} error={errors.width} placeholder="30" />
        <Field label="Height" name="height" type="number" inputMode="decimal" min="0" step="0.1" defaultValue={values.height} error={errors.height} placeholder="60" />
        <Field label="Unit" name="sizeUnit" error={errors.sizeUnit}>
          <select id="sizeUnit" name="sizeUnit" defaultValue={values.sizeUnit}>
            {SIZE_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Colours"
        name="colours"
        defaultValue={values.colours}
        hint="Separate with commas: Red, White, Blue checks"
      />

      <fieldset className={styles.choices}>
        <legend>Finish</legend>
        {FINISHES.map((finish) => (
          <label key={finish} className={styles.choice}>
            <input type="radio" name="finish" value={finish} defaultChecked={values.finish === finish} />
            <strong>{finishLabels[finish]}</strong>
          </label>
        ))}
      </fieldset>
      {errors.finish && <p className={styles.error}>{errors.finish}</p>}

      <div className={styles.row}>
        <Field label="Price (₹)" name="price" type="number" inputMode="decimal" min="0" step="0.01" defaultValue={values.price} error={errors.price} />
        <Field label="Per" name="priceUnit" error={errors.priceUnit}>
          <select id="priceUnit" name="priceUnit" defaultValue={values.priceUnit}>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unitLabels[unit]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Minimum order" name="minOrder" type="number" inputMode="numeric" min="1" defaultValue={values.minOrder} error={errors.minOrder} />
        <Field label="Stock" name="stock" type="number" inputMode="numeric" min="0" defaultValue={values.stock} error={errors.stock} />
      </div>

      <Field label="Description" name="description">
        <textarea id="description" name="description" defaultValue={values.description} maxLength={1000} />
      </Field>

      <div className={styles.actions}>
        <Link href="/dashboard" className={styles.cancel}>
          Cancel
        </Link>
        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? 'Saving...' : product ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
