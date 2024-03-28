import Carousel from "./slider";

const Hero = () => {
  // const images = [
  //     "/hero.jpg",
  //     "/product.jpeg",
  //     "/shopping2.jpg",
  //     "/shopping3.jpg",
  //     "/shopping4.jpg",
  //   ];
  return (
    <div className="max-w-screen-xl mx-auto  bg-[#2196F3] ">


      <div className="min-h-96 flex flex-col items-center justify-center h-full">
        <h1 className="lg:text-4xl font-bold text-white text-2xl">
          welcome to Code store
        </h1>
        <p className="lg:text-lg  text-[12px] text-white">
          The best place to find the most amazing products
        </p>
      </div>
    </div>
  );
};

export default Hero;
