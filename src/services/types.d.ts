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

export type GradeLevel = "1st" | "2nd" | "3rd" | "4th" | "5th";
export type EnrollmentStatus =
  | "active"
  | "graduated"
  | "transferred"
  | "inactive";

export type Student = {
  id: string;
  gradeLevel: GradeLevel;
  classroomId: number | null;
  userId: string;
  enrollmentStatus: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type ListResponse<E> = {
  info?: {
    count: number;
    next: string | null;
    previous: string | null;
    page: number;
    perPage: number;
    lastPage: number;
  };
  results: E[];
};

export type UsersWithoutStudent = Pick<User, "id"> & { fullName: string };
