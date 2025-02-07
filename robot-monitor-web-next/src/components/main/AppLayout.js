// /components/main/AppLayout.js
"use client";

import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { RoverProvider } from "./RoverContext";

export default function AppLayout({ children }) {
  return (
    // Wrap the entire layout in RoverProvider
    <RoverProvider>
      <Navbar />
      {children}
      <Footer />
    </RoverProvider>
  );
}
