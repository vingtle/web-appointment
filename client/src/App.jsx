import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";

function App() {
  return (
    <div id="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
