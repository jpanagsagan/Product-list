import { Modal } from '@mui/material';
import { FC, Fragment, useEffect } from 'react';
import styles from './index.module.scss';
import ImageLoader from '../imageLoader';
import { Product } from '@/api/response';

type PreviewModalProps = {
  product: Product | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const PreviewComponent: FC<PreviewModalProps> = ({ product, isModalOpen, setIsModalOpen }) => {
  useEffect(() => {
    console.log(product);
  });
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalWrapper}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
          &times;
        </button>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <p className={styles.category}>{product?.category}</p>
          <h1 className={styles.productTitle}>{product?.title}</h1>
          <p className={styles.description}>{product?.description}</p>
          <p className={styles.price}>₱ {product?.price}</p>
        </div>

        {/* More Images */}
        <div className={styles.imageContainer}>
          <h3 className={styles.imageLabel}>MORE IMAGES</h3>
          <div className={styles.imageWrapper}>
            {product &&
              product.images.map((image: string, index: number) => (
                <Fragment key={index}>
                  <ImageLoader src={image} alt={`Product image ${index + 1}`} type={'modal'} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewComponent;
