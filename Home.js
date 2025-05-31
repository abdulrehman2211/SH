import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
// Assuming you might still want arrows if you expand to a multi-slide hero later
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Define the specific image link you want to use
const firstSlideImageUrl = 'https://c8.alamy.com/comp/D8BYK2/tag-in-the-foreground-showing-discount-in-store-sign-with-offer-of-D8BYK2.jpg';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      superTitle: "Grand Festive Offer",
      titleLine1: "Sale 20% Off",
      titleLine2: "On Everything", // Matched to Alamy image context
      description: "Discover exquisite Zardozi artistry. Unveil timeless elegance with our handcrafted masterpieces, now at a special price. Limited time offer!",
      buttonText: "Shop Now",
      buttonLink: "/products?promo=sale20",
      image: firstSlideImageUrl, // Using the Alamy image URL here
      bgColor: 'bg-gradient-to-br from-red-50 via-pink-50 to-red-100', // Adjusted to complement the red tag
      superTitleColor: 'text-red-600',
      titleColor: 'text-slate-800', // Adjusted for better contrast with new bgColor
      textColor: 'text-slate-600', // Adjusted
      buttonBgColor: 'bg-red-1500',
      buttonHoverBgColor: 'hover:bg-red-600',
      // Add textAlignment and imageAlignment if needed for this single slide version
      textAlignment: 'lg:text-left',
      imageAlignment: 'lg:justify-end',
    },
    // This version currently only defines one slide.
    // You can add more slides here if you intend to make it a carousel,
    // and then you would uncomment the auto-slide useEffect and add navigation.
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // Stays at 0 if only one slide
  const [isVisible, setIsVisible] = useState(false); // For fade-in on scroll
  const sectionRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver for fade-in effect
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) { // Optional: unobserve after visible
             observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current; // Capture ref value
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array

  const activeSlide = slides[currentSlide];

  if (!activeSlide) return null;

  return (
    <section
      ref={sectionRef}
      className={`relative ${activeSlide.bgColor} overflow-hidden transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[70vh] md:min-h-[80vh] py-12 lg:py-0">
          {/* Text Content */}
          <div className={`lg:w-1/2 text-center ${activeSlide.textAlignment || 'lg:text-left'} lg:pr-12 z-10 mb-10 lg:mb-0
                           transition-opacity duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className={`text-lg sm:text-xl font-semibold ${activeSlide.superTitleColor} uppercase tracking-wider mb-2 font-display
                           transform transition-transform duration-500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              {activeSlide.superTitle}
            </p>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl ${activeSlide.titleColor} font-bold leading-tight mb-1
                           transform transition-transform duration-500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              {activeSlide.titleLine1}
            </h1>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl ${activeSlide.titleColor} font-bold leading-tight mb-6 font-display
                           transform transition-transform duration-500 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              {activeSlide.titleLine2}
            </h1>
            <p className={`text-base sm:text-lg ${activeSlide.textColor} mb-8 max-w-lg mx-auto ${activeSlide.textAlignment === 'lg:text-left' ? 'lg:mx-0' : 'lg:mx-auto'}
                           transform transition-transform duration-500 delay-[1100ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              {activeSlide.description}
            </p>
            <Link
              to={activeSlide.buttonLink}
              className={`inline-block px-8 py-3 ${activeSlide.buttonBgColor} ${activeSlide.buttonHoverBgColor} text-white text-lg font-semibold rounded-md shadow-md
                           transition-all duration-300 transform hover:scale-105
                           delay-[1300ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
              {activeSlide.buttonText}
            </Link>
          </div>

          {/* Image Content */}
          <div className={`lg:w-1/2 flex ${activeSlide.imageAlignment || 'lg:justify-center'} items-center relative h-full
                           transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative group">
              <img
                src={activeSlide.image}
                alt={activeSlide.titleLine1}
                className={`max-h-[60vh] sm:max-h-[70vh] object-contain relative z-10 rounded-lg shadow-xl
                            transition-transform duration-700 ease-out group-hover:scale-105
                            transform ${isVisible ? 'scale-100' : 'scale-90'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null); // Keep if you use hover effects on features

  const features = [
    // Feature 1 was removed in your provided code block, I'm keeping it consistent.
    // If you want it back, you can copy it from the second code block you provided.
    {
      id: 2,
      title: "Exclusive Designs",
      description: "Unique and contemporary designs infused with traditional Zardozi art.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Timeless Elegance",
      description: "Invest in pieces that offer lasting beauty and sophistication.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    }
  ];
   // To add back the first feature, ensure the `features` array looks like this:
   /*
   const features = [
    {
      id: 1,
      title: "Authentic Craftsmanship",
      description: "Each piece meticulously handcrafted by skilled Zardozi artisans.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .819.162l3.987 3.987a.75.75 0 0 1-1.06 1.06l-3.987-3.987a8.971 8.971 0 0 0-4.252.992V21.75a.75.75 0 0 1-1.5 0V17.155a8.971 8.971 0 0 0-4.252-.992l-3.987 3.987a.75.75 0 0 1-1.06-1.06l3.987-3.987A8.97 8.97 0 0 0 3 15a9 9 0 0 0 9-9 8.97 8.97 0 0 0-3.463.69a.75.75 0 0 1-.819-.162L1.718 3.528a.75.75 0 0 1 1.06-1.06l3.987 3.987A8.971 8.971 0 0 0 11.001 3V1.5a.75.75 0 0 1 1.5 0v1.502a8.971 8.971 0 0 0 4.252.992l3.987-3.987a.75.75 0 0 1 1.06 1.06l-3.987 3.987A8.97 8.97 0 0 0 15 9a9 9 0 0 0-9-9 8.97 8.97 0 0 0-3.463.69.75.75 0 0 1-.819.162Z" />
        </svg>
      )
    },
    // ... other features ...
   ];
   */


  return (
    <div className="bg-white text-text-primary">
      <HeroSlider />

      <section className="py-16 lg:py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-serif">
              Why Zardozi80?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Experience the luxury of handcrafted Zardozi art, unique designs, and exceptional quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"> {/* Adjusted grid for fewer items if feature 1 is missing */}
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-[#e8c4c0]`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 transition-colors duration-300 ${hoveredFeature === feature.id ? 'bg-[#b76e79] text-white' : 'bg-[#f9f2ed] text-[#b76e79]'
                    }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
                <div
                  className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-all duration-300 ${hoveredFeature === feature.id ? 'bg-[#b76e79]' : 'bg-transparent'
                    }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#faf7f5] relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-serif">
              Featured Collection
            </h2>
            <p className="text-lg text-text-secondary">
              Handpicked selections from our exquisite Zardozi range.
            </p>
          </div>
          <ProductList />
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-[#b76e79] text-[#b76e79] hover:bg-[#b76e79] hover:text-white text-lg font-semibold rounded-lg transition-all duration-300 group"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#f9f2ed] to-[#fceee7]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-serif">
            Join Our Community
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new collections, exclusive offers, and style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-4 rounded-lg border border-[#e8c4c0] bg-white focus:outline-none focus:ring-2 focus:ring-[#b76e79] focus:border-transparent"
            />
            <button className="px-8 py-4 bg-[#b76e79] hover:bg-[#9d5c66] text-white font-semibold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-[1.02]">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-text-secondary mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;