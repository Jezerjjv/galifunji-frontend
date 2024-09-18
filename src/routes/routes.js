import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import LandingPage from "../components/landing/ladingPage";
import Start from "../components/start";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import SecurityPolicy from "../components/legalInformation/securityPolicy";
import PrivacyPolicy from "../components/legalInformation/privacyPolicy";
import LegalAdvice from "../components/legalInformation/legalAdvice";
import DetailMushrooms from "../components/mushrooms/detailMushrooms";
import NotFound from "../components/common/404";
import CategoryAdminPanel from "../components/admin/category";
import MushroomsAdminPanel from "../components/admin/mushrooms";
import Admin from "../components/admin/admin";
import Prueba from "../components/prueba";
const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/start" element={displayPageCommon(<Start/>)} />
                <Route path="/security-policy" element={displayPageCommon(<SecurityPolicy/>)} />
                <Route path="/privacy-policy" element={displayPageCommon(<PrivacyPolicy/>)} />
                <Route path="/legal-advice" element={displayPageCommon(<LegalAdvice/>)} />
                <Route path="/mushrooms/:id" element={displayPageCommon(<DetailMushrooms/>)} />
                <Route path="/admin/category" element={displayPageCommon(<CategoryAdminPanel/>)} />
                <Route path="/admin/mushrooms" element={displayPageCommon(<MushroomsAdminPanel/>)} />
                <Route path="/admin" element={displayPageCommon(<Admin/>)} />
                <Route path="*" element={displayPageCommon(<NotFound/>)} />
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
