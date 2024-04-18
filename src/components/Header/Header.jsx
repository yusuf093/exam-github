import React from "react";
import { CiHome } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import "./header.css";

export const Header = () => {
  const { cart } = useCart();
  const { favorites } = useFavorite();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  return (
    <header>
      <div className="container">
        <div className="header__left__right">
          <div className="header__left">
            <Link to="/">
              <button className="header__btn">
                <CiHome className="header__btn__icon" />
                Shop4Goodies
              </button>
            </Link>
          </div>
          <div className="header__right">
            <nav>
              <ul>
                <li className="header__link">
                  <Link to="/">Home</Link>
                </li>
                <li className="header__link">
                  <Link to="/admin">Admin</Link>
                </li>
              </ul>
            </nav>
            <Link to="/favorite">
              <button className="header__favorites">
                <MdFavoriteBorder /> Favorites
                {favoritesCount ? <span className="favorites__count">({favoritesCount})</span> : null}
              </button>
            </Link>
            <Link to="/yourcart">
              <button className="header__basket">
                <SlBasket className="header__btn__icon" /> Your cart
                {cartCount ? <span className="cart__count">({cartCount})</span> : null}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
