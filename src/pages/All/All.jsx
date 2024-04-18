import React, { useEffect, useState } from "react";
import "./all.css";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { BiSolidCartDownload } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useFavorite } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";
import Search from "../Home/Search/Search";
import loadingImg from "../../assets/images/loading.svg";
import NoResultsImg from "../../assets/images/No results.jpg";

export const All = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setFilter(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredData = filter || [];
    if (selectedCategory) {
      filteredData = filter.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (search.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilter(filteredData);
  }, [selectedCategory, search, filter]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const toggleFavorite = (item) => {
    const isFavorite = favorites?.some((favorite) => favorite.id === item.id);
    if (isFavorite) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  const toggleCartItem = (item) => {
    const isAdded = cartItems?.some((cartItem) => cartItem.id === item.id);
    if (!isAdded) {
      addToCart(item);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="btn">
          <Link to="/">
            <button className="back">
              <IoIosArrowRoundBack className="back__icon" />
            </button>
          </Link>
          <select
            className="option"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Filter by Product</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        {loading ? (
          <div className="center">
            <img src={loadingImg} alt="Loading" />
          </div>
        ) : (
          <ul className="all">
            {filter && filter.length ? (
              filter.map((item) => (
                <li className="all__card" key={item.id}>
                  <img className="all__img" src={item.image} alt={item.title} />
                  <h3 className="all__title">{item.title}</h3>
                  <p className="all__description">{item.description}</p>
                  <p className="all__price">{item.price}</p>
                  <div className="all__btns">
                    <button
                      className={`all__btn ${
                        favorites?.some((favorite) => favorite.id === item.id)
                          ? "active"
                          : ""
                      }`}
                      onClick={() => toggleFavorite(item)}
                    >
                      <GrFavorite />
                    </button>
                    <button
                      className={`all__btn ${
                        cartItems?.some((cartItem) => cartItem.id === item.id)
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => toggleCartItem(item)}
                      disabled={cartItems?.some(
                        (cartItem) => cartItem.id === item.id
                      )}
                    >
                      <BiSolidCartDownload />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <img src={NoResultsImg} alt="No results" />
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default All;
