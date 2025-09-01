
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume it's set in the environment.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

export const generateExplanation = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API key is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating explanation:', error);
    return 'An error occurred while fetching the explanation. Please try again later.';
  }
};
