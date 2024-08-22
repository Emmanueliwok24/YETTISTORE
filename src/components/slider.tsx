"use client";
import { useEffect, useState } from "react";

const Carousel = ({ texts }: { texts: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === texts.length - 1 ? 0 : prevSlide + 1
      );
    }, 80000);

    return () => clearInterval(interval);
  }, [texts]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? texts.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === texts.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden lg:rounded-lg h-96 flex items-center justify-center ">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center text-center p-4  ${index === currentSlide ? "block" : "hidden"
              } duration-700 ease-linear transition-all`}
          >
            <p className="text-xl font-bold text-gray-800">{text}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        {/* Your previous button SVG */}
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        {/* Your next button SVG */}
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
