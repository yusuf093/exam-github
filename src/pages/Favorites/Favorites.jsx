import React, { useEffect, useState } from "react";
import { useFavorite } from "../../context/FavoriteContext";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../../context/CartContext";

export const Favorites = () => {
  const {
    favorites,
    removeFromFavorites: removeFromFavoritesContext,
    addToFavorites: addToFavoritesContext,
  } = useFavorite();
  const { cart, addToCart, removeFromCart } = useCart();
  const [favoritesState, setFavoritesState] = useState([]);

  useEffect(() => {
    try {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesState(favoritesFromStorage);
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
    }
  }, []); // Вызывается при загрузке компонента

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
  }, [favoritesState]); // Вызывается при изменении favoritesState

  const updateFavorites = (updatedFavorites) => {
    addToFavoritesContext(updatedFavorites);
    setFavoritesState(updatedFavorites);
  };

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favoritesState.filter((item) => item.id !== id);
    updateFavorites(updatedFavorites);
  };

  const handleAddToFavorites = (item) => {
    const updatedFavorites = [...favoritesState, item];
    updateFavorites(updatedFavorites);
  };

  const handleAddToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="cart__left__right">
          <ul className="cart__left">
            {favoritesState.map((item) => (
              <FavoriteItem
                key={item.id}
                item={item}
                removeFromFavorites={handleRemoveFromFavorites}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const FavoriteItem = ({ item, removeFromFavorites, handleAddToCart }) => {
  return (
    <li className="favorite__wrapper">
      <div className="favorite__img">
        <img src={item.image} alt="" />
      </div>
      <div className="favorite__info">
        <h2>{item.price}</h2>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="favorite__btns">
          <button
            className="favorite__btn"
            onClick={() => removeFromFavorites(item.id)}
          >
            <MdDeleteForever />
          </button>
          <button
            className="favorite__btn"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default Favorites;
