'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { Pagination } from '@mui/material';
import PreviewComponent from '../previewModal';
import { PRODUCT_MESSAGES } from '@/utils/messages';
import ImageLoader from '../imageLoader';
import { PRODUCTS_API } from '@/api/endpoints';
import { Product, ProductsResponse } from '@/api/response';

const HomeComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Fetching data function
  const fetchData = useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const limit = 10;
      const response = await fetch(
        `${PRODUCTS_API.SEARCH}?limit=${limit}&skip=${limit * (page - 1)}&q=${query}`,
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result: ProductsResponse = await response.json();
      setProducts(result.products);
      setTotal(result.total);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced fetch data effect
  useEffect(() => {
    const debounceFetchData = setTimeout(() => {
      fetchData(searchQuery, currentPage);
    }, 300); // Adjust the debounce time as needed

    return () => clearTimeout(debounceFetchData); // Cleanup timeout on unmount
  }, [fetchData, searchQuery, currentPage]);

  // Handling search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handling page change for pagination
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Handling product click to open modal
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // Update isSearching state based on searchQuery
  useEffect(() => {
    setIsSearching(!!searchQuery);
  }, [searchQuery]);

  // Memoizing products display message
  const productsMessage = useMemo(() => {
    if (loading) {
      return isSearching ? PRODUCT_MESSAGES.PRODUCT_SEARCHING : PRODUCT_MESSAGES.PRODUCT_LOADING;
    }
    if (error) {
      return PRODUCT_MESSAGES.PRODUCT_ERROR;
    }
    if (products.length === 0) {
      return PRODUCT_MESSAGES.PRODUCT_NOT_FOUND;
    }
    return null;
  }, [loading, error, products.length, isSearching]);

  return (
    <div className={styles.homeWrapper}>
      <header>
        <h1>Products Table</h1>
        <p>Products demo</p>
      </header>

      <main>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <div className={styles.clearSearch} onClick={() => setSearchQuery('')}>
              &times;
            </div>
          )}
        </div>

        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {productsMessage ? (
                <tr>
                  <td colSpan={3}>{productsMessage}</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} onClick={() => handleProductClick(product)}>
                    <td>
                      <div className={styles.imageWrapper}>
                        <ImageLoader src={product.thumbnail} alt={product.title} type={'table'} />
                      </div>
                    </td>
                    <td>
                      <p className={styles.title}>{product.title}</p>
                      <p className={styles.description}>{product.description}</p>
                    </td>
                    <td>₱{product.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <Pagination
            count={Math.ceil(total / 10)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
            className={styles.pagination}
          />
        )}
      </main>

      {isModalOpen && (
        <PreviewComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default HomeComponent;
