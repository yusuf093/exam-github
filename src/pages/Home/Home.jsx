import React from "react";
import { Hero } from "./Hero/Hero";
import { Free } from "./Free/Free";
import { Customers } from "./Customers/Customers";
import { Stay } from "./Stay/Stay";
import Slider from "./Slider/Slider";
import Card from "../../pages/Home/Card/Card";

export const Home = () => {
  return (
    <div>
      <Hero />
      <Slider />
      <Card />
      <Free />
      <Customers />
      <Stay />
    </div>
  );
};
