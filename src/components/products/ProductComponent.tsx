import React from 'react';
import { useCartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../contexts/CartContext';

interface ProductComponentProps {
  item: Product
  enableDelete?: boolean;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ item, enableDelete = false }) => {
  const { dispatch } = useCartContext();

  const addProduct = (): void => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { ...item }
    });
  };

  const deleteProduct = (): void => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: { ...item }
    });
  };

  const increaseProduct = (): void => {
    dispatch({
      type: "INCREASE_PRODUCT",
      payload: { ...item }
    });
  };

  const decreaseProduct = (): void => {
    dispatch({
      type: "DECREASE_PRODUCT",
      payload: { ...item }
    });
  };

  return (
    <div className='product'>
      <div className="product-details">
        <img src={item.thumbnail} alt="product image" />
        <p>{item.title}</p>
        <p>price £{item.price}</p>
        <p>{item.description}</p>
      </div>
      <div className="actions">
        {enableDelete ?
          <>
            <div className='controllers'>
              <span onClick={decreaseProduct}> - </span>
              <p>{item.count}</p>
              <span onClick={increaseProduct}> + </span>
            </div>
            <button onClick={deleteProduct}>Delete From Cart</button>
          </>
          :
          <>
            <Link to={`/products/${item.id}`} >View Product Details</Link>
            <button onClick={addProduct}>Add To Cart</button>
          </>
        }
      </div>
    </div>
  );
};

export default ProductComponent;