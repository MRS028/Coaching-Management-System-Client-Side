import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaChevronRight, FaStar, FaChalkboardTeacher, FaUserGraduate, FaAward } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';


const HomeBanner = () => {
  const carouselData = [
    {
      id: 1,
      title: "শ্রেষ্ঠ শিক্ষার মাধ্যমে স্বপ্নের বিশ্ববিদ্যালয়ে ভর্তি হোন",
      description: "বিশ্বস্ত ও অভিজ্ঞ শিক্ষকদের সরাসরি গাইডলাইনে আমাদের বিশেষায়িত কোচিং প্রোগ্রামে অংশগ্রহণ করুন এবং আপনার প্রস্তুতিতে এগিয়ে যান। ...",
      buttonText: "এখনই ভর্তি হও",
      buttonColor: "bg-gradient-to-r from-blue-600 to-green-600",
      buttonLink: "/register",
      imageUrl: "https://i.ibb.co/0yvBYMhQ/allcoaching.jpg",
      stats: [
        { icon: <FaUserGraduate />, text: "১০০০+ সফল শিক্ষার্থী" },
        { icon: <FaStar />, text: "৯৫% সাফল্যের হার" }
      ]
    },
    {
      id: 2,
      title: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য সম্পূর্ণ গাইডলাইন",
      description: "আমাদের বিশেষভাবে ডিজাইনকৃত স্টাডি ম্যাটেরিয়াল এবং মডেল টেস্ট ,....",
      buttonText: "কোর্স ডিটেইলস দেখুন",
      buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      imageUrl: "https://i.ibb.co.com/gbfCxWM1/coaching-all.jpg",
      buttonLink: "/courses",
      stats: [
        { icon: <FaChalkboardTeacher />, text: "১৫+ অভিজ্ঞ শিক্ষক" },
        { icon: <FaAward />, text: "১০০% প্রমাণিত সিলেবাস" }
      ]
    },
    {
      id: 3,
      title: "আধুনিক শ্রেণীকক্ষ ও সুযোগ-সুবিধা সহ প্রিমিয়াম কোচিং",
      description: "আমাদের আধুনিক শ্রেণীকক্ষে পড়াশোনা করুন যেখানে সব ধরনের প্রযুক্তিগত সুবিধা রয়েছে ,আমাদের শ্রেণীকক্ষে প্রযুক্তির সাথে আধুনিক শিক্ষা পদ্ধতির সমন্বয়।...",
      buttonText: "সুবিধাগুলো দেখুন",
      buttonColor: "bg-gradient-to-r from-orange-600 to-red-600",
      buttonLink: "/courses",
      imageUrl: "https://i.ibb.co.com/yFhDBC3W/coaching.jpg",
      stats: [
        { icon: <FaStar />, text: "২৪/৭ স্টাডি সাপোর্ট" },
        { icon: <FaUserGraduate />, text: "ব্যক্তিগত মেন্টরশিপ" }
      ]
    },
    {
      id: 4,
      title: "বিশ্বস্ত এবং অভিজ্ঞ শিক্ষকবৃন্দ...",
      description: "আমাদের শিক্ষকগণ প্রতিযোগিতামূলক পরীক্ষায় অভিজ্ঞ,আমাদের শিক্ষকগণ প্রতিযোগিতামূলক পরীক্ষায় অভিজ্ঞ, যারা শিক্ষার্থীদের সাফল্যের পথে পথপ্রদর্শক। ...",
      buttonText: "শিক্ষকদের পরিচিতি",
      buttonLink: "/teachers",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-blue-600",
      imageUrl: "https://i.ibb.co.com/zTRwNb97/coaching-teachers.jpg",
      stats: [
        { icon: <FaChalkboardTeacher />, text: "১০+ বছর অভিজ্ঞতা" },
        { icon: <FaAward />, text: "বিভাগীয় টপার তৈরি" }
      ]
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = carouselData.length;

  // Auto play effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % totalSlides);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] overflow-hidden rounded-xl shadow-2xl">
      {/* Slides */}
      {carouselData.map((slide, index) => (
        <div
          key={slide?.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Image with fallback */}
          <div className="absolute inset-0">
            <img
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1920x1080?text=Image+Not+Available";
              }}
            />
            <div className="absolute inset-0  bg-opacity-40"></div>
          </div>

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-2xl text-white mt-6">
                <div className='h-40'>
                  {/* <h1 className="text-2xl hidden sm:text-3xl backdrop-blur-xs text-white md:text-4xl lg:text-4xl font-bold mb-4 border bg-gradient-to-r border-none p-4 rounded-4xl sm:mb-6 leading-tight drop-shadow-lg">
                    <Typewriter
                      words={[slide.title]}
                      cursor={false}
                      cursorStyle="_"
                      typeSpeed={100}
                      loop={Infinity}

                      deleteSpeed={60}
                      delaySpeed={1000}
                    />
                  </h1> */}
{/* 
                  <p className="text-base hidden font-bold backdrop-blur-sm text-white p-2 rounded-4xl px-3 sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 drop-shadow-md">
                    <Typewriter
                      words={[slide.description]}
                      loop={Infinity}
                      cursor={false}
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={30}
                      delaySpeed={1000}
                    />
                  </p> */}
                </div>


                <div className="flex pt-16 flex-wrap gap-2 mx-4 md:mx-0 sm:gap-3 mb-2 sm:mb-6 md:mb-4">
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="flex items-center bg-black bg-opacity-30 px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm text-sm sm:text-base">
                      <span className="mr-2 text-yellow-300">{stat.icon}</span>
                      <span>{stat.text}</span>
                    </div>
                  ))}
                </div>
                <div className='flex justify-center md:justify-start'>
                  <Link to={"/admission"}><button className={`${slide.buttonColor} text-white  py-3 px-6 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center`}>
                    {slide.buttonText}
                    <FaChevronRight className="ml-2" />
                  </button></Link>
                </div>
                

              </div>
              <p className="text-base mt-4 font-bold backdrop-blur-sm text-white p-2 rounded-2xl  sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 drop-shadow-md">
                <Marquee gradient={false} speed={70} pauseOnHover={true}>
                  {slide.description}
                </Marquee>
              </p>
              
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile, shown on md and up */}
      <button
        onClick={prevSlide}
        className=" hidden absolute left-4 top-1/2 -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm z-10 transition-all hover:scale-110"
      >
        <FaArrowLeft className="text-xl sm:text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden  absolute right-4 top-1/2 -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm z-10 transition-all hover:scale-110"
      >
        <FaArrowRight className="text-xl sm:text-2xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === activeSlide ? 'bg-white w-4 sm:w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;