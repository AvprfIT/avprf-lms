
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

function StudentLayout() {
    return (
        <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">
                <Outlet />
            
                </div>
            </div>
            
        </div>
            <Footer />
        </div>
    );
}

export default StudentLayout;
