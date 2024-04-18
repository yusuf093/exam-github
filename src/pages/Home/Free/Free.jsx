import React from "react";
import { MdLocalShipping } from "react-icons/md"; // Импортируем MdLocalShipping
import "./free.css";

export const Free = () => {
  return (
    <>
      <section className="free">
        <div className="container">
          <h3>Free Shipping on Orders over €49</h3>
        </div>
        <div className="free__icon">
          <MdLocalShipping /> {/* Используем MdLocalShipping */}
        </div>
      </section>
    </>
  );
};
