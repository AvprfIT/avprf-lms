
import { NavLink } from "react-router-dom";

function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: "ri-dashboard-line" },
        { name: "My Courses", path: "/my-courses", icon: "ri-book-open-line" },
        { name: "Learning", path: "/learning", icon: "ri-play-circle-line" },
        { name: "Study Materials", path: "/study-materials", icon: "ri-file-pdf-line" },
        { name: "My Progress", path: "/my-progress", icon: "ri-bar-chart-line" },
        { name: "Payments", path: "/payments", icon: "ri-wallet-line" },
        { name: "My Profile", path: "/profile", icon: "ri-user-line" },
    ];

    return (
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box">
                    <a href="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22"/>
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-dark.png" alt="" height="17"/>
                        </span>
                    </a>
                    <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22"/>
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-light.png" alt="" height="17"/>
                        </span>
                    </a>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>
                <div id="scrollbar">
                    <div className="container-fluid">

                        <div id="two-column-menu">
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                            {menuItems.map((item) => (
                                <li className="nav-item" key={item.path}>
                                    <NavLink className="nav-link" to={item.path}>
                                        <i className={item.icon}></i>
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        

                        </ul>
                    </div>
                
                </div>
                <div className="sidebar-background"></div>
            </div>
        
    );
}

export default Sidebar;
