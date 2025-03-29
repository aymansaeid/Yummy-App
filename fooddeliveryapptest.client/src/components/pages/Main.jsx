import React from 'react';
import Navbar from '../common/Navbar'; // Path to Navbar
import Header from '../common/Header'; // Path to Header
import AppDownload from '../common/AppDownload'; // Path to AppDownload
import Footer from '../common/Footer'; // Path to Footer

const Main = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <AppDownload />
            <Footer />
        </div>
    );
};

export default Main;