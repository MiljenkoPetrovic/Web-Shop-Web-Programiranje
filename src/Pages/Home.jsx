import Navigacija from '../Components/Navbar/Navbar';
import SlideShow from '../Components/Slider/Slider';
import React from 'react';
import BestItems from '../Components/BestItems/BestItems';
import Footer from '../Components/Footer/Footer';

function Home() {
    return (
        <React.Fragment>
        <SlideShow />
        <BestItems />
        <Footer />
        </React.Fragment>
    );
}

export default Home;