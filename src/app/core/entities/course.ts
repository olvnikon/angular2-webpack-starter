import { Author } from './author';

export interface Course {
  id: string;
  name: string;
  duration: number;
  date: Date;
  description: string;
  votes: number;
  authors: Author[];
}
