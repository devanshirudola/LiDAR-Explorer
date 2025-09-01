
import React, { useState, useEffect } from 'react';
import { generateExplanation } from '../services/geminiService';

interface AppInfo {
  title: string;
  description: string;
  imageUrl: string;
}

const appTopics = [
  'Autonomous Vehicles',
  'Forestry and Environmental Monitoring',
  'Archaeology and Cultural Heritage',
  'Urban Planning and Smart Cities',
  'Robotics and Industrial Automation',
  'Agriculture and Precision Farming'
];

const imageKeywords = {
  'Autonomous Vehicles': 'autonomous car lidar',
  'Forestry and Environmental Monitoring': 'forest drone',
  'Archaeology and Cultural Heritage': 'ancient ruins',
  'Urban Planning and Smart Cities': 'smart city',
  'Robotics and Industrial Automation': 'factory robot',
  'Agriculture and Precision Farming': 'agriculture drone'
}

const LoadingCard: React.FC = () => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-700"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
    </div>
);


const InfoCard: React.FC<AppInfo> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Applications: React.FC = () => {
    const [apps, setApps] = useState<AppInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppsData = async () => {
            setIsLoading(true);
            const promises = appTopics.map(async (topic, index) => {
                const prompt = `Write a short, engaging description (about 40-50 words) of how LiDAR and data science are used in ${topic}.`;
                const description = await generateExplanation(prompt);
                const keyword = imageKeywords[topic as keyof typeof imageKeywords] || 'technology';
                return {
                    title: topic,
                    description,
                    imageUrl: `https://picsum.photos/seed/${keyword.replace(' ', '')}${index}/600/400`
                };
            });
            const results = await Promise.all(promises);
            setApps(results);
            setIsLoading(false);
        };

        fetchAppsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
                appTopics.map(topic => <LoadingCard key={topic} />)
            ) : (
                apps.map((app) => (
                    <InfoCard key={app.title} {...app} />
                ))
            )}
        </div>
    );
};

export default Applications;
