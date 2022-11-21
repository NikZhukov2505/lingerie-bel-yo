import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { useDispatch } from 'react-redux';

const Layout = ({ children }) => {
    const dispatch = useDispatch()
    return (
        <>
            <Header dispatch={dispatch} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;