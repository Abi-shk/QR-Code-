// Header.jsx
import React from 'react';
import logo from './assets/logo.png';

const Header = () => {
 


  return (
    <header className="bg-gray-200 p-6 flex justify-center items-center">
      <img
        src={logo} // Replace with the path to your PNG image
        alt="Techmaghi Logo"
        className="w-44 h-auto cursor-pointer" // Add cursor-pointer to indicate it's clickable
      />
    </header>
  );
};

export default Header;

