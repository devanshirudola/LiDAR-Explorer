
import React, { useState, useEffect, useCallback } from 'react';
import { PipelineStep } from '../types';
import { generateExplanation } from '../services/geminiService';

const pipelineSteps: PipelineStep[] = [
  PipelineStep.ACQUISITION,
  PipelineStep.PREPROCESSING,
  PipelineStep.SEGMENTATION,
  PipelineStep.CLASSIFICATION,
  PipelineStep.TRACKING,
];

const stepIcons: Record<PipelineStep, React.ReactNode> = {
    [PipelineStep.ACQUISITION]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    [PipelineStep.PREPROCESSING]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 10a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2z" /></svg>,
    [PipelineStep.SEGMENTATION]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
    [PipelineStep.CLASSIFICATION]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>,
    [PipelineStep.TRACKING]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
};


const DataSciencePipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<PipelineStep>(PipelineStep.ACQUISITION);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = useCallback(async (step: PipelineStep) => {
    setIsLoading(true);
    setError(null);
    const prompt = `Explain the "${step}" step in the LiDAR data science pipeline in a concise, easy-to-understand paragraph. Focus on the goal of this step and the common techniques used.`;
    try {
      const result = await generateExplanation(prompt);
      setExplanation(result);
    } catch (e) {
      setError('Failed to fetch explanation.');
      setExplanation('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExplanation(activeStep);
  }, [activeStep, fetchExplanation]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-800 p-6 rounded-lg shadow-2xl">
      <div className="lg:w-1/3 flex flex-col space-y-2">
        {pipelineSteps.map((step) => (
          <button
            key={step}
            onClick={() => setActiveStep(step)}
            className={`flex items-center space-x-4 p-4 rounded-lg text-left transition-all duration-200 w-full ${
              activeStep === step
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600/70'
            }`}
          >
            <div className={`p-2 rounded-full ${activeStep === step ? 'bg-cyan-500' : 'bg-gray-600'}`}>{stepIcons[step]}</div>
            <span className="font-semibold">{step}</span>
          </button>
        ))}
      </div>
      <div className="lg:w-2/3 bg-gray-900 p-6 rounded-lg min-h-[250px] flex flex-col justify-center">
        {isLoading ? (
            <div className="flex items-center justify-center space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                <div className="w-4 h-4 bg-cyan-400 rounded-full animation-delay-200"></div>
                <div className="w-4 h-4 bg-cyan-400 rounded-full animation-delay-400"></div>
            </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <p className="text-gray-300 leading-relaxed">{explanation}</p>
        )}
      </div>
    </div>
  );
};

export default DataSciencePipeline;
