
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M19 12h.01M12 8h.01M12 15h.01M12 5h.01" />
            </svg>
            <span className="text-xl font-bold text-white">LiDAR Explorer</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          <a href="#visualization" className="hover:text-cyan-400 transition-colors">Simulation</a>
          <a href="#pipeline" className="hover:text-cyan-400 transition-colors">Pipeline</a>
          <a href="#applications" className="hover:text-cyan-400 transition-colors">Applications</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
