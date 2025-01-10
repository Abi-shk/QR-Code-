// Header.jsx
import React from 'react';
import techmaghi from './assets/techmaghi.png';

const Header = () => {
 


  return (
    <header className="bg-gray-200 p-6 flex justify-center items-center">
      <img
        src={techmaghi} // Replace with the path to your PNG image
        alt="Techmaghi Logo"
        className="w-12 h-auto cursor-pointer" // Add cursor-pointer to indicate it's clickable
      />
      <h1 className='font-bold text-blue-900 text-3xl ml-1 '>TECHMAGHI</h1>
    </header>
  );
};

export default Header;

