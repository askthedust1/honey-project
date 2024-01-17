import React, { useState } from 'react';
import Slider from 'react-slick';
import ImageItem from '@/components/ImageSlider/ImageItem';
import { IBanner } from '@/types';
import stl from '../../styles/_imgSlider.module.scss';

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
          <ImageItem image={image} key={image._id} />
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
