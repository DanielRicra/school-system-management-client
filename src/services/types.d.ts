interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type User = {
  id: string;
  code: string;
  firstName: string;
  surname: string;
  role: "admin" | "student" | "teacher";
  gender: string | null;
  deletedAt: string | null;
} & Timestamps;

export type GradeLevel = "1st" | "2nd" | "3rd" | "4th" | "5th";
export type EnrollmentStatus =
  | "active"
  | "graduated"
  | "transferred"
  | "inactive";

export interface Student extends Timestamps {
  id: string;
  gradeLevel: GradeLevel;
  classroomId: number | null;
  userId: string;
  enrollmentStatus: EnrollmentStatus;
}

export type StudentWithUser = Student & { user: User };
export interface StudentWithRelations extends Student {
  user: User;
  classroom?: Classroom | null;
}

export type Classroom = {
  id: number;
  gradeLevel: GradeLevel;
  year: string;
  section: string;
  roomId: number | null;
} & Timestamps;

export type Room = {
  id: number;
  roomNumber: string;
  capacity: number | null;
} & Timestamps;

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

export type BasicUser = Pick<User, "id"> & { fullName: string };

export interface Teacher extends Timestamps {
  id: string;
  department: string | null;
  userId: string;
}
export type TeacherWithUser = Teacher & { user: User };

export interface Course extends Timestamps {
  id: number;
  code: string;
  name: string;
  classroomId: number | null;
  teacherId: string | null;
}
