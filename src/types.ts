export interface Group {
  id: string;
  name: string;
  teacher: string;
  schedule: {
    day: string;
    start: string;
    end: string;
  }[];
  location: string;
  modality: 'Presencial' | 'Virtual' | 'Híbrida';
  credits: number;
  capacity: number;
  enrolled: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  groups: Group[];
}

export interface EnrollmentInfo {
  period: string;
  date: string;
  allowedCredits: number;
  status: string;
  folio: string;
}

export interface UserProfile {
  name: string;
  campus: string;
  progress: number;
  entryType: string;
  previousAverage: number;
  totalCredits: number;
}
