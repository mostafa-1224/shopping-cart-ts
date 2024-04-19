import React from 'react';
import { useCartContext } from '../../contexts/CartContext';
import ProductComponent from '../products/ProductComponent';
import TrashCanIcon from "../../assets/TrashCanIcon.png";
import "./cart.scss";

const CartPage: React.FC = () => {
  
  const { state: cartCtx, dispatch } = useCartContext();

  let price: number = 0;
  for (let i: number = 0; i < cartCtx.length; i++) {
    price += (cartCtx[i].count * cartCtx[i].price);
  }
  
  return (
    <div className="cart-page">
      {cartCtx.length ?
        <>
          <p>You Will Pay £{Math.round(price * 100) / 100}</p>
          {cartCtx.length > 0 && <p onClick={() => dispatch({ type: "EMPTY_CART" })}><img src={TrashCanIcon} alt="" width="25px" /> Empty Your Cart</p>}
          <div className='cart-products-container'>
            {cartCtx.map(item => <ProductComponent key={item.id} item={item} enableDelete={true} />)}
          </div>
        </>
        :
        <h3>Your Cart Is Empty Please Add Some Products To Your Cart</h3>
      }
    </div>
  );
}

export default CartPage;