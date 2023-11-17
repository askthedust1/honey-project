import React, { useState } from 'react';
import Slider from 'react-slick';
import { IBanner } from '@/types';
import { apiUrl } from '@/constants';
import stl from './imgSlider.module.css';
import Link from 'next/link';

interface Props {
  images: IBanner[];
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testSettings = {
    backgroundColor: 'rgb(0,0,0)',
    outline: '0',
  };

  const settings = {
    dots: true,
    dotsClass: stl.dots,
    speed: 3000,
    autoplaySpeed: 5000,
    slideToShow: 1,
    slideToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    },
    appendDots: (dots: React.ReactNode[]) => {
      return (
        <div>
          <ul>
            {dots.map((item, index) => {
              return <li key={index}>{item !== null && item !== undefined ? item : null}</li>;
            })}
          </ul>
        </div>
      );
    },
    customPaging: (index: number) => {
      return <button style={index === currentSlide ? testSettings : {}}>{index + 1}</button>;
    },
  };

  return (
    <div className={stl.image__slider__container}>
      <Slider {...settings}>
        {images.map((image) => (
          <Link key={image._id} href={'/products/page/1'}>
            <img src={apiUrl + '/' + image.image} alt={image.description} />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
