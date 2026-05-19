export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      issues: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      issue_updates: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      alerts: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      traffic_signals: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      pipelines: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      projects: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      environmental_data: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
      ai_predictions: { Row: Record<string, Json | null>; Insert: Record<string, Json | null>; Update: Record<string, Json | null> };
    };
  };
}
