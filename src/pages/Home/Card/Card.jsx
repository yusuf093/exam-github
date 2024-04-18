import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { FaArrowRight } from "react-icons/fa";
import { BiSolidCartDownload } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import loadingImg from "../../../assets/images/loading.svg";
import No from "../../../assets/images/No results.jpg";
import { useCart } from "../../../context/CartContext";
import { useFavorite } from "../../../context/FavoriteContext";
import Search from "../Search/Search";

const Card = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorite();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [clickedItemCounts, setClickedItemCounts] = useState({});
  const [activeButtons, setActiveButtons] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setFilter(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error :", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredData = filter;
    if (selectedCategory) {
      filteredData = filteredData.filter(
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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCartButtonClick = (id) => {
    const cartItem = filter.find((item) => item.id === id);

    if (cartItem) {
      const itemIndex = cart.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const updatedCart = cart.filter((item) => item.id !== id);
        removeFromCart(id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        addToCart(cartItem);
        localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
      }

      setClickedItemCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + 1,
      }));

      setActiveButtons((prevActiveButtons) => ({
        ...prevActiveButtons,
        [id]: true,
      }));

      if (activeButtons[id]) {
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      setTimeout(() => {
        setActiveButtons((prevActiveButtons) => ({
          ...prevActiveButtons,
          [id]: false,
        }));
      }, 1000);
    }
  };

  const handleAddRemoveFavorite = (id) => {
    const isFavorite = favorites.some((favorite) => favorite.id === id);
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(filter.find((item) => item.id === id));
    }
  };

  const handleButtonClick = (id) => {
    setActiveButtons((prevActiveButtons) => ({
      ...prevActiveButtons,
      [id]: !prevActiveButtons[id],
    }));
  };

  return (
    <section>
      <Search setInputVal={handleSearch} />
      <div className="container">
        <div className="card__info">
          <div className="crad__info__text">
            <div className="card__info__title">New Arrivals</div>
            <div className="card__info__suptitle">
              Check out the latest products
            </div>
          </div>

          <div className="select">
            <select
              className="option"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">All</option>
              <option value="electronics">electronics</option>
              <option value="jewelery">jewelery</option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
            </select>

            <Link to="/all">
              <button className="card__info__btn">
                View all <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <center>
            <img src={loadingImg} alt="Loading" />
          </center>
        ) : (
          <>
            <ul className="card__block">
              {filter.length ? (
                filter.map((item) => (
                  <li className="card" key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <img
                        className="card__img"
                        src={item.image}
                        alt={item.title}
                      />
                    </Link>
                    <h3 className="card__title">{item.title}</h3>
                    <p className="card__description">{item.description}</p>
                    <p className="card__price">{item.price}</p>
                    <div className="card__btns">
                      <button
                        className={`card__btn1 ${
                          favorites.some((favorite) => favorite.id === item.id)
                            ? "active"
                            : ""
                        } ${activeButtons[item.id] ? "active" : ""}`}
                        onClick={() => {
                          handleAddRemoveFavorite(item.id);
                          handleButtonClick(item.id);
                        }}
                        onMouseEnter={() => handleButtonClick(item.id)}
                        onMouseLeave={() => handleButtonClick(item.id)}
                      >
                        <GrFavorite />
                      </button>
                      <button
                        className={`card__btn2 ${
                          activeButtons[item.id] ? "active" : ""
                        }`}
                        onClick={() => {
                          handleCartButtonClick(item.id);
                          handleButtonClick(item.id);
                        }}
                        onMouseEnter={() => handleButtonClick(item.id)}
                        onMouseLeave={() => handleButtonClick(item.id)}
                      >
                        <BiSolidCartDownload />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <img src={No} alt="" />
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default Card;
