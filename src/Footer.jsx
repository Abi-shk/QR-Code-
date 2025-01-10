import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-blue-500 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:example@gmail.com" className="hover:text-gray-400">
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Techmaghi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
