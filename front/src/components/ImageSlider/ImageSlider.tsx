import React, { useState } from 'react';
import Slider from 'react-slick';
import { IBanner } from '@/types';
import { apiUrl } from '@/constants';
import stl from '../../styles/imgSlider.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  images: IBanner[];
  width: number;
}

const ImageSlider: React.FC<Props> = ({ images, width }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testSettings = {
    backgroundColor: 'rgb(0,0,0)',
    outline: '0',
  };

  const settings = {
    dots: true,
    infinite: true,
    dotsClass: stl.dots,
    speed: 3000,
    autoplaySpeed: 5000,
    slideToShow: 1,
    slideToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    arrows: false,
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    },
    appendDots: (dots: React.ReactNode[]) => {
      return (
        <div>
          {dots.map((item, index) => {
            return <div key={index}>{item !== null && item !== undefined ? item : null}</div>;
          })}
        </div>
      );
    },
    customPaging: (index: number) => {
      return <button style={index === currentSlide ? testSettings : {}}>{index + 1}</button>;
    },
  };

  return (
    <div className={stl.image__slider__container} style={{ maxWidth: `${width}px` }}>
      <Slider {...settings}>
        {images.map((image) => (
          <Link key={image._id} href={image.page}>
            <Image
              width="0"
              height="0"
              sizes="100vw"
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
              quality={100}
              src={apiUrl + '/' + image.image}
              alt={image.description}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
