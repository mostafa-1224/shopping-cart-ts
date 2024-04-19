import React from 'react';
import "./products.scss";
import useApiHook from '../../utils/useApiHook';
import ProductComponent from './ProductComponent';
import { Product } from '../../contexts/CartContext';
// export interface Product {
//   id: number;
//   thumbnail: string;
//   title: string;
//   price: number;
//   description: string;
//   count: number;
// }

const ProductsPage: React.FC = () => {
  const { data, isLoading, error } = useApiHook<{products:Product[]}>('https://dummyjson.com/products');
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='products-container'>
      {data?.products && data?.products.map((item) => (
        <ProductComponent key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductsPage;