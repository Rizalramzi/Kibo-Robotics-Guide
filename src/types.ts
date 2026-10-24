export interface CommandItem {
  id: string;
  command: string;
  description: string;
  env: 'powershell' | 'ubuntu' | 'git';
  note?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface TroubleshootingItem {
  id: string;
  issue: string;
  symptom: string;
  cause: string;
  solution: string;
  commands?: string[];
}
