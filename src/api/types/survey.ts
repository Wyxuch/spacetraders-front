export interface Deposit {
  symbol: string;
}

export interface Survey {
  signature: string;
  symbol: string;
  deposits: Deposit[];
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
  surveys: Survey[];
}

export interface SurveyResponse {
  data: SurveyData;
}
