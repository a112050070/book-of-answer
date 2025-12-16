export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING', // The "Ceremony" phase
  REVEALED = 'REVEALED',
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export interface AnswerStyle {
  id: string;
  name: string;
  description: string;
}