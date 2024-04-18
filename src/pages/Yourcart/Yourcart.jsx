import React from "react";
import { useCart } from "../../context/CartContext";
import { GrFavorite } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useFavorite } from "../../context/FavoriteContext";
import "./yourcart.css";

export const YourCart = () => {
  const { cart, removeFromCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorite();

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleAddToFavorites = (item) => {
    const isFavorite = favorites.some((favorite) => favorite.id === item.id);
    if (isFavorite) {
      removeFromFavorites(item.id); // Передаем только идентификатор элемента
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="cart__left__right">
          <ul className="cart__left">
            {cart.map((item) => (
              <li className="cart__wrapper" key={item.id}>
                <div className="cart__img">
                  <img src={item.image} alt="" />
                </div>
                <div className="cart__info">
                  <h2>{item.price}</h2>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="cart__btns">
                    <button
                      className="cart__btn__like"
                      onClick={() => handleAddToFavorites(item)}
                    >
                      <GrFavorite />
                    </button>
                    <button
                      className="cart__btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
