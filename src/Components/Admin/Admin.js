import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Home/Navbar/Navbar';

const Admin = () => {
    return (
        <div>
           <Navbar></Navbar>
           <Outlet></Outlet>
        </div>
    );
};

export default Admin;