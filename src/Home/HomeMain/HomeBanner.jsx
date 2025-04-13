import React, { useEffect, useState } from 'react';

const HomeBanner = () => {
  // Fake data for carousel slides
  const carouselData = [
    {
      id: 1,
      title: "শ্রেষ্ঠ শিক্ষার মাধ্যমে তোমার স্বপ্নের বাস্তবায়ন",
      description: "আমাদের প্রফেশনাল কোর্সে ভর্তি হয়ে তুমি পাবে শিক্ষকদের সঠিক দিকনির্দেশনা এবং ব্যক্তিগত মনোযোগ।",
      buttonText: "এখনই ভর্তি হও",
      buttonColor: "primary",
      imageUrl: "https://i.ibb.co.com/0yvBYMhQ/allcoaching.jpg"
    },
    {
      id: 2,
      title: "নির্ভরযোগ্য ফলাফল",
      description: "আমাদের শিক্ষার্থীরা প্রতিযোগিতামূলক পরীক্ষায় সর্বোচ্চ র‍্যাঙ্ক অর্জন করে, এটি আমাদের গর্ব।",
      buttonText: "সাফল্যের গল্প দেখুন",
      buttonColor: "secondary",
      imageUrl: "https://i.ibb.co.com/gbfCxWM1/coaching-all.jpg"
    },
    {
      id: 3,
      title: "বিশ্বস্ত এবং অভিজ্ঞ শিক্ষকবৃন্দ",
      description: "আমাদের শিক্ষকগণ প্রতিযোগিতামূলক পরীক্ষায় অভিজ্ঞ, যারা তোমাকে সঠিক প্রস্তুতি নিতে সহায়তা করবেন।",
      buttonText: "আমাদের শিক্ষকদের সাথে পরিচিত হন",
      buttonColor: "accent",
      imageUrl: "https://i.ibb.co.com/zTRwNb97/coaching-teachers.jpg"
    },
    {
      id: 4,
      title: "আধুনিক শ্রেণীকক্ষ ও সুযোগ-সুবিধা",
      description: "আমাদের আধুনিক শ্রেণীকক্ষে পড়াশোনা করুন যেখানে সব ধরনের প্রযুক্তিগত সুবিধা রয়েছে।",
      buttonText: "আমাদের সুবিধাগুলি দেখুন",
      buttonColor: "info",
      imageUrl: "https://i.ibb.co.com/yFhDBC3W/coaching.jpg"
    }
  ];
  
  

  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = carouselData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev % totalSlides) + 1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Navigation buttons handler
  const goToSlide = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  // Previous slide handler
  const prevSlide = () => {
    setActiveSlide(prev => prev === 1 ? totalSlides : prev - 1);
  };

  // Next slide handler
  const nextSlide = () => {
    setActiveSlide(prev => prev === totalSlides ? 1 : prev + 1);
  };

  return (
    <div className="w-full">
      {/* Carousel using DaisyUI native component */}
      <div className="carousel w-full rounded-box relative">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 btn btn-circle z-10 hidden"
        >
          ❮
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 btn btn-circle z-10 hidden"
        >
          ❯
        </button>
        
        {/* Slides */}
        {carouselData.map((slide) => (
          <div 
            key={slide.id}
            id={`slide${slide.id}`} 
            className={`carousel-item relative h-[600px] w-full transition-opacity duration-500 ${activeSlide === slide.id ? 'block' : 'hidden'}`}
          >
            <div 
              className="hero h-full w-full" 
              style={{backgroundImage: `url(${slide.imageUrl})`}}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-">
                  <h1 className="mb-5 text-5xl font-bold">{slide.title}</h1>
                  <p className="mb-5">{slide.description}</p>
                  <button className={`btn btn-${slide.buttonColor}`}>
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {carouselData.map((slide) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={`w-3 hidden h-3 rounded-full ${activeSlide === slide.id ? 'bg-primary hidde' : 'bg-gray-300'} hidden`}
            aria-label={`Go to slide ${slide.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;