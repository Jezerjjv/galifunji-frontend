import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingP1 from './landingP1';
import LandingP2 from './landingP2';
import LandingP3 from './landingP3';
import LandingP4 from './landingP4';
import NavbarLanding from './navbarLanding';
import FooterLanding from './footerLanding';
import Divider from '../common/divider';


function LandingPage() {
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);



    return (
        <div className="bg-dark text-light">
            <NavbarLanding />
            <LandingP1 />
            <Divider light={false} />
            <LandingP2 />
            <Divider light={false} />
            <LandingP3 />
            <Divider light={false} />
            <LandingP4 />
            <FooterLanding />
        </div>
    );
}

export default LandingPage;