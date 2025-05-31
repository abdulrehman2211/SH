// src/pages/AboutPage.js
import React from 'react';

const AboutPage = () => {
  const image1Url = 'https://th.bing.com/th/id/OIP._QA3jO0iOdVvz_tdiyAJ3wHaFH?rs=1&pid=ImgDetMain';
  const image2Url = 'https://www.voici.fr/imgre/fit/~1~voi~2021~04~13~3ea02413-3297-45e1-9d09-b64e7b550b16.jpeg/1200x600/cr/wqkgTU9URiAvIFZvaWNp/focus-point/959%2C236/petits-prix-decouvrez-motf-la-marque-premium-de-shein.jpg';
  const image3PlaceholderText = "Detailed Zardozi Craftsmanship";

  return (
    <div className="min-h-screen bg-gray-50 text-text-primary"> {/* Ensure text-text-primary is defined in tailwind.config.js */}
      {/* Hero Section */}
      <div className="bg-brand-secondary py-16 md:py-24 px-4 text-center"> {/* Ensure brand-secondary is defined */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-brand-primary mb-4"> {/* Ensure brand-primary is defined */}
          Our Story
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"> {/* Ensure text-text-secondary is defined */}
          Weaving tradition with contemporary elegance, Zardozi80 brings you the timeless art of handcrafted luxury.
        </p>
      </div>

      {/* Image Gallery Section - RESPONSIVE IMAGES */}
      <div className="py-12 lg:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary text-center mb-10 font-serif">
            A Glimpse into Our World
          </h2>
          {/* 
            RESPONSIVENESS POINT 1: The Grid
            - grid-cols-1: 1 column on extra-small screens (default)
            - sm:grid-cols-2: 2 columns on small screens and up
            - lg:grid-cols-3: 3 columns on large screens and up
            This makes the overall layout of gallery items responsive.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Image 1 */}
            {/*
              RESPONSIVENESS POINT 2: Aspect Ratio Container
              - aspect-w-1 aspect-h-1: Creates a square container.
              - The width of this container is responsive due to the grid column it's in.
              - Its height will match its width, maintaining the square shape.
              (Requires @tailwindcss/aspect-ratio plugin)
            */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden shadow-lg group">
              {/*
                RESPONSIVENESS POINT 3: Image Filling the Container
                - w-full h-full: Image tries to fill its parent (the square container).
                - object-cover: Scales the image to maintain its aspect ratio while
                                filling the container's dimensions. Cropping will occur if
                                the image's aspect ratio is not 1:1.
                - object-center: Centers the image if cropped.
              */}
              <img
                src={image1Url}
                alt="Elegant Zardozi Fashion"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Image 2 (Same responsive techniques apply) */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden shadow-lg group">
              <img
                src={image2Url}
                alt="Zardozi Brand Showcase"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" // Note: duration was 500 here before, harmonized to 300
              />
            </div>

            {/* Image 3 - Placeholder (Same responsive techniques would apply if it were an img) */}
            <div className="aspect-w-1 aspect-h-1 bg-teal-100 rounded-lg overflow-hidden shadow-lg group sm:col-span-2 lg:col-span-1">
              {/* 
                If you replace this with an <img> tag, use the same classes as above:
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              */}
              <div className="w-full h-full flex items-center justify-center p-4">
                <span className="text-teal-700 text-center">{image3PlaceholderText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Content Section */}
      <div className="py-16 lg:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-base font-semibold text-brand-primary tracking-wide uppercase">
              Our Philosophy
            </p>
            <h2 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-text-primary sm:text-4xl font-serif">
              Crafting Heirlooms, Stitch by Stitch
            </h2>
          </div>
          {/* 
            RESPONSIVENESS POINT 4: Prose classes for text content
            - prose-lg sm:prose-xl: Adjusts typography size and spacing responsively.
            (Requires @tailwindcss/typography plugin)
          */}
          <div className="prose prose-lg sm:prose-xl max-w-none text-text-secondary mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 font-serif">The Zardozi80 Journey</h3>
              <p>
                Welcome to Zardozi80, where ancient artistry meets modern sophistication. Our journey began with a deep appreciation for Zardozi – a majestic form of metal embroidery that once adorned the attire of royalty in India, Persia, and beyond. We are dedicated to reviving and reimagining this exquisite craft for the contemporary connoisseur.
              </p>
              <p>
                Our mission is to create more than just clothing and accessories; we aim to craft heirlooms. Each piece in our collection is a testament to the skill, patience, and passion of our master artisans who have inherited this intricate technique through generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 font-serif">Our Commitment</h3>
              <p>
                At Zardozi80, we are committed to ethical practices and sustainability. We work directly with artisan communities, ensuring fair wages and fostering an environment where their craft can flourish. By choosing Zardozi80, you are not only acquiring a piece of unparalleled beauty but also supporting the livelihoods of these talented individuals and helping to preserve a precious cultural heritage.
              </p>
              <p>
                We meticulously source high-quality materials, from lustrous silks and velvets to fine metallic threads and semi-precious stones, ensuring that every creation is as durable as it is beautiful.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 font-serif">An Invitation</h3>
               <p>
                We invite you to explore our collections and experience the opulence and charm of Zardozi. Whether it's an elegant shawl, a statement clutch, or a bespoke garment, each Zardozi80 piece is designed to make you feel extraordinary.
              </p>
              <p className="mt-6 text-center">
                With passion & craftsmanship,
              </p>
              <div className="mt-4 text-center">
                <div className="text-3xl text-brand-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  The Zardozi80 Team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;