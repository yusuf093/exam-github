import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import "./search.css";

const Search = ({ setInputVal }) => {
  const inputHandle = (evt) => {
    if (evt.key === "Enter") {
      setInputVal(evt.target.value);
    }
  };

  return (
    <section className="search">
      <div className="container">
        <center>
          <input
            className="  form-control"
            type="text"
            placeholder="Search for products"
            onKeyUp={inputHandle}
          />
          <button className="search__btn-custom">
            <TfiSearch />
          </button>
        </center>
      </div>
    </section>
  );
};

export default Search;
