import React from 'react';
import { useParams } from 'react-router-dom';
import useApiHook from '../../utils/useApiHook';
import { Product } from '../../contexts/CartContext';

const ProductDetails: React.FC = () => {
  let params = useParams<{ id: string }>();
  const { data, isLoading, error } = useApiHook<Product>(`https://dummyjson.com/products/${params.id}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='product-details'>
      <img src={data?.thumbnail} alt="product image" />
      <p>Title : {data?.title}</p>
      <p>Brand : {data?.brand}</p>
      <p>Category : {data?.category}</p>
      <p>Description : {data?.description}</p>
      <p>Rating : {data?.rating}</p>
      <p>Price £{data?.price}</p>
      <p>DiscountPercentage : £{data?.discountPercentage}</p>
    </div>
  );
}

export default ProductDetails;