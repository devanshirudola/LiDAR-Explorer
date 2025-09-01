
import React from 'react';
import Header from './components/Header';
import LidarVisualization from './components/LidarVisualization';
import DataSciencePipeline from './components/DataSciencePipeline';
import Applications from './components/Applications';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section id="intro" className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-cyan-400">LiDAR Meets Data Science</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            Explore how Light Detection and Ranging (LiDAR) technology generates vast point clouds of data, and how data science techniques transform this raw data into meaningful insights.
          </p>
        </section>

        <section id="visualization" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Interactive LiDAR Simulation</h2>
          <LidarVisualization />
        </section>

        <section id="pipeline" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">The LiDAR Data Science Pipeline</h2>
          <DataSciencePipeline />
        </section>

        <section id="applications" className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Real-World Applications</h2>
            <Applications />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
