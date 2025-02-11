import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Pages/SharedPage/NavBar';
import Footer from '../../Pages/SharedPage/Footer';

const HomeLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
            
        </div>
    );
};

export default HomeLayout;