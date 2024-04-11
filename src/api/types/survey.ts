export interface Deposits {
  symbol: string;
}

export interface Surveys {
  signature: string;
  symbol: string;
  deposits: Deposits[];
  expiration: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
}

export interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: string;
}

export interface SurveyData {
  cooldown: Cooldown;
  surveys: Surveys[];
}

export interface SurveyResponse {
  data: SurveyData;
}
