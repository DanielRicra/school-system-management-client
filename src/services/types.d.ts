export type User = {
  id: string;
  code: string;
  firstName: string;
  surname: string;
  role: "admin" | "student" | "teacher";
  gender: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id: string;
  gradeLevel: "1st" | "2nd" | "3rd" | "4th" | "5th";
  classroomId: number | null;
  userId: string;
  enrollmentStatus: "active" | "graduated" | "transferred" | "inactive";
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type ListResponse<E> = {
  info: {
    count: number;
    next: string | null;
    previous: string | null;
    page: number;
    perPage: number;
    lastPage: number;
  };
  results: E[];
};
