import React from 'react';
import HomeOpener from "@/components/home/homeOpener/HomeOpener";
import cls from './homePage.module.scss'

const HomePage = () => {
    return (
        <div className={cls.home}>
            <HomeOpener/>
        </div>
    );
};

export default HomePage;
