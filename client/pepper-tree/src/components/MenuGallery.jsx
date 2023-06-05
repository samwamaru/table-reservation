import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MenuGallery = () => {
  const menuItems = [
    {
      src: '/images/food-1.jpg',
      alt: 'Menu Item 1',
      downloadUrl: '/images/food-1.jpg',
    },
    {
      src: '/images/food-2.jpg',
      alt: 'Menu Item 2',
      downloadUrl: '/images/food-3.jpg',
    },
    {
      src: '/images/food-3.jpg',
      alt: 'Menu Item 2',
      downloadUrl: '/images/food-3.jpg',
    },
    {
      src: '/images/drink-1.jpg',
      alt: 'Menu Item 2',
      downloadUrl: '/images/food-3.jpg',
    },
    {
      src: '/images/drink-2.jpg',
      alt: 'Menu Item 2',
      downloadUrl: '/images/food-3.jpg',
    },
    {
      src: '/images/drink-3.jpg',
      alt: 'Menu Item 3',
      downloadUrl: '/images/drink-1.jpg',
    },
    // Add more menu items here
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Menu Gallery</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          className="carousel-wrapper"
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-6 z-10"
                style={{ color: '#000', fontSize: '3rem' }}
              >
                &lt;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-6 z-10"
                style={{ color: '#000', fontSize: '3rem' }}
              >
                &gt;
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => (
            <li
              key={index}
              onClick={onClickHandler}
              style={{
                background: isSelected ? '#000' : '#999',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                display: 'inline-block',
                margin: '0 5px',
                cursor: 'pointer',
              }}
              title={label}
            />
          )}
          renderIndicatorWrapper={(children) => <ul style={{ display: 'flex' }}>{children}</ul>}
        >
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <img
                src={menuItem.src}
                alt={menuItem.alt}
                className="rounded-lg object-contain w-full h-auto mx-auto"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MenuGallery;
