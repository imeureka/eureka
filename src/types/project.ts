// types/project.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  blog?: string;
  awards?: string[];
  screenshots?: string[];
  link?: string;
}
