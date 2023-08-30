export interface DumpCourse {
  id: number;
  title: string;
  poster: string;
  lessons: DumpLesson[];
}

export interface DumpLesson {
  title: string;
  url: string;
}