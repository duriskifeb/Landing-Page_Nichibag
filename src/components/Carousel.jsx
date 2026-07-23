// src/components/Carousel.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Carousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/home/carousel");
        setSlides(response.data);
      } catch (error) {
        console.error("Gagal memuat data carousel:", error);
      }
    };
    fetchCarousel();
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[60vh] sm:h-[450px] md:h-[550px] lg:h-[650px] bg-gray-200 flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 font-medium text-lg">Belum ada gambar carousel.</p>
        <p className="text-gray-400 text-sm">Silakan tambahkan gambar melalui halaman Admin.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-[60vh] sm:h-[450px] md:h-[550px] lg:h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => {
                if (slide.link) window.location.href = slide.link;
              }}
            >
              <img
                src={`http://127.0.0.1:5000${slide.url}`}
                alt={slide.nama}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-red-100 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-red-100 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4"></div>
    </div>
  );
}

export default Carousel;