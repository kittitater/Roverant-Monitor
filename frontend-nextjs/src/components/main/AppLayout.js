"use client";

import React from "react";
import Navbar from './navbar'
import Footer from './footer'

export default function WelcomeLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}