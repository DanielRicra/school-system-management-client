import { create } from "zustand";

import type { StudentWithUser } from "@/services/types";

type StudentSheetType = "create" | "edit" | "delete";

interface StudentSheetState {
  isOpen: boolean;
  type: StudentSheetType | null;
  data: Partial<StudentWithUser>;
  onOpen: (type: StudentSheetType, data?: Partial<StudentWithUser>) => void;
  onClose: () => void;
}

export const useStudentsSheet = create<StudentSheetState>()((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}));
