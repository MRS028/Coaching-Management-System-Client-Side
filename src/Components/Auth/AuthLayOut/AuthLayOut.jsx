import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayOut = () => {
    return (
        <div>
            <Outlet/>
            
        </div>
    );
};

export default AuthLayOut;