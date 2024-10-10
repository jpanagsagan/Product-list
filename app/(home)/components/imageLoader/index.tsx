import Image from 'next/image';
import { FC, useState } from 'react';
import styles from './index.module.scss';

export type ViewType = 'table' | 'modal';
type ImageLoaderProps = {
  src: string;
  alt: string;
  type: ViewType;
};

const ImageLoader: FC<ImageLoaderProps> = ({ src, alt, type }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {/*loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={styles.loader}></span>
        </div>
      )}
      {/*loaded image */}
      <div className={type === 'modal' ? styles.imageModal : styles.imageWrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          className={`rounded-md ${loading ? 'invisible' : 'visible'}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </div>
  );
};
export default ImageLoader;
