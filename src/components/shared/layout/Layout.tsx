import React from 'react';
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../../assets/cart-icon.png";
import { useCartContext } from '../../../contexts/CartContext';
import './layout.scss';


const Layout: React.FC = () => {

  const { state: cartCtx } = useCartContext();
  let items: number = 0;
  for (let i: number = 0; i < cartCtx.length; i++) {
    items += cartCtx[i].count;
  }
  return (
    <div className="layout">
      <div className="header">
        <h1>Tangent</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li className="cart-icon">
              <img src={CartIcon} alt="" width="30px" />
              <span>{items}</span>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;