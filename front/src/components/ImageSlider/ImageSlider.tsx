import React from 'react'
import Slider from 'react-slick'
import {IBanner} from "@/types";
import {apiUrl} from "@/constants";
import stl from './imgSlider.module.css';

interface Props {
    images: IBanner[];
}

const ImageSlider: React.FC<Props> = ({images}) => {
    const settings = {
        dots:true,
        speed:3000,
        slideToShow:1,
        slideToScroll:1,
        initialSlide:0,
        pauseOnHover:true,
        autoplay:true,
    };

    return (
        <div className={stl.image__slider__container}>
            <Slider {...settings}>
                {
                    images.map((image)=>(
                        <img src={apiUrl + '/' + image.image} alt={image.description} key={image._id} />
                    ))
                }
            </Slider>
        </div>
    )
}

export default ImageSlider