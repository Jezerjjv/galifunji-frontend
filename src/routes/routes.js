import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import LandingPage from "../components/landing/ladingPage";
import Mushrooms from "../components/mushrooms";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import SecurityPolicy from "../components/legalInformation/securityPolicy";
import PrivacyPolicy from "../components/legalInformation/privacyPolicy";
import LegalAdvice from "../components/legalInformation/legalAdvice";
const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/mushrooms" element={displayPageCommon(<Mushrooms/>)} />
                <Route path="/security-policy" element={displayPageCommon(<SecurityPolicy/>)} />
                <Route path="/privacy-policy" element={displayPageCommon(<PrivacyPolicy/>)} />
                <Route path="/legal-advice" element={displayPageCommon(<LegalAdvice/>)} />
            </Routes>
        </Router>
    );


    function displayPageCommon(children) {
        return (
            <>
                <div className='main'>
                    <Header />
                    <div className='container-p'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </>)
    }
}   

export default Rutas;
