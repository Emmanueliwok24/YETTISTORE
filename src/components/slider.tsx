"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative   overflow-hidden lg:rounded-lg h-96">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`${index === currentSlide ? "block" : "hidden"
              } duration-700 ease-linear transition-all`}
          >
            <Image
              src={imageUrl}
              className="absolute block w-full -translate-x-1/2 lg:h-auto h-full  object-cover object-top  -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"></div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        {/* Your previous button SVG */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        {/* Your next button SVG */}
      </button>
    </div>
  );
};

export default Carousel;
