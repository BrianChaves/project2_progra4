import React, { useEffect, useState } from 'react'
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';

function Header({currentUser, showAdminContent, showStandardContent}) {
    const logOut = () => {
        AuthService.logout();
    };

    return (
        <>
            <nav className="navbar navbar-light bg-navbar navbar-expand-lg p-3 shadow-sm">
                <div className="container-fluid">
                    <Link to={`/`} className="navbar-brand">
                        Auto-Insurance
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-between me-auto mb-2 mb-lg-0">
                        {currentUser !== undefined && (
                        <>
                            <li className="nav-item">
                                <Link to={`/home`} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            { showStandardContent && (
                            <span>
                                <li className="nav-item">
                                    <a className="nav-link">Payments</a>
                                </li>
                            </span>
                            )}
                            { showAdminContent && (
                            <>
                            <span>
                                <li className="nav-item">
                                    <a className="nav-link">Categories</a>
                                </li>
                            </span>
                            <span>
                                <li className="nav-item">
                                    <a className="nav-link">Coverages</a>
                                </li>
                            </span>
                            <span>
                                <li className="nav-item">
                                    <a className="nav-link">Vehicles</a>
                                </li>
                            </span>
                            </>
                            )}
                        </>
                        )}
                        </ul>
                    </div>
                </div>
            {currentUser ? (
                <div className="row col-auto justify-content-end">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                        <ul className="navbar-nav justify-content-between me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/user/${currentUser.username}`} className="nav-link">
                                    {currentUser.username}'s Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#logoutModal" className="nav-link" data-bs-toggle="modal" data-bs-target="#logoutModal">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="row col-auto justify-content-end">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                        <ul className="navbar-nav justify-content-between me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            </nav>
            {currentUser && (
            <div className="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">Log Out</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Are you sure you want to log out?</h5>
                        </div>
                        <div className="modal-footer">
                            <a href="/index.html?page=login&logout=true" className="btn btn-danger" onClick={logOut}>Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Header;