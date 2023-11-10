import React from 'react';
import HomeOpener from "@/components/home/homeOpener/HomeOpener";
import cls from './homePage.module.scss'
import Advantages from "@/components/home/advantages/Advantages";
import Bestseller from "@/components/home/bestseller/Bestseller";

const HomePage = () => {
    return (
        <div className={cls.home}>
            <HomeOpener/>
            <Advantages/>
            <Bestseller/>
        </div>
    );
};

export default HomePage;
