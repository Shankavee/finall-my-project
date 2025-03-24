export interface Course {
    _id: string;
    title: string;
    description: string;
    objectives: string;
    prerequisites: string;
    modules: any[]; // Replace `any` with a proper type if possible
    schedule: string;
    preview: boolean;
  }
  