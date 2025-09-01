
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} LiDAR & Data Science Explorer. All Rights Reserved.</p>
        <p className="text-sm mt-1">Built with React, TypeScript, Tailwind CSS, and Gemini API.</p>
      </div>
    </footer>
  );
};

export default Footer;
