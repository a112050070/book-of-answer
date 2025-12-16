import { API_KEY, API_URL, MODEL_NAME, PROMPT_TEMPLATE, DEFAULT_QUERY_PLACEHOLDER, FALLBACK_ANSWERS } from '../constants';
import { OpenRouterResponse } from '../types';

/**
 * Clean the response string (remove quotes, extra newlines)
 */
const cleanResponse = (text: string): string => {
  return text.replace(/["'「」]/g, '').trim();
};

/**
 * Get a random fallback answer
 */
export const getFallbackAnswer = (): string => {
  const index = Math.floor(Math.random() * FALLBACK_ANSWERS.length);
  return FALLBACK_ANSWERS[index];
};

/**
 * Call OpenRouter API
 */
export const fetchAnswerFromAI = async (userQuery: string): Promise<string> => {
  // Spec: If user input is empty, use default placeholder logic
  const actualQuery = userQuery.trim() === '' ? DEFAULT_QUERY_PLACEHOLDER : userQuery;
  
  // Construct the prompt merging system role into user content
  const fullPrompt = PROMPT_TEMPLATE.replace('{{User_Input}}', actualQuery);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        // Optional headers for OpenRouter rankings (good practice)
        'HTTP-Referer': 'https://localhost:3000',
        'X-Title': 'AI Book of Answers',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.warn('API Response not OK, using fallback.');
      return getFallbackAnswer();
    }

    const data: OpenRouterResponse = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return cleanResponse(data.choices[0].message.content);
    }
    
    return getFallbackAnswer();

  } catch (error) {
    console.error('AI Service Error:', error);
    // Spec: Fallback mechanism guarantees user experience is not interrupted
    return getFallbackAnswer();
  }
};