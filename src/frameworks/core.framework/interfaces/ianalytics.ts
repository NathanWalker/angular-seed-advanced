export interface IAnalyticsProperties {
  category?: string;
  label?: string;
  value?: number;
}

export interface IAnalytics {
  track(action: string, properties: IAnalyticsProperties): void;
}
