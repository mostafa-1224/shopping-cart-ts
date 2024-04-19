import React from 'react';
import CartIcon from "../../assets/cart-icon.png";
import "./landing.scss";

const LandingPage: React.FC = () => {
  return (
    <div className='landing-container'>
      <img src={CartIcon} alt="" width="300px" />
      <h1>Welcome To Our Shopping Cart</h1>
    </div>
  )
}

export default LandingPage;