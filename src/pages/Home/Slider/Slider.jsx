import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <div className="container">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqq_k_XVdOn5RDTcL3E7b4vVDKYqvlLOfD7wnVOK05Bg&s"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovDk3777IDccoENdV7ktT9rDFx_lNGQAVJwTFmbGwGQ&s"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3r3-uvr0wrz9tDS19d8BmzE_87FB8g0yht14WqkWblA&s"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWSoCDKU4vvHhOhGUmgTYwaSaUhSR2imLZy0n2jiksw&s"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y84ABBdidunwVZXzW4LiI4XcRFVn-L3oj51ZYFXOg&s"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
