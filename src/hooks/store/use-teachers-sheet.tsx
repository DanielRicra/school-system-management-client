import { create } from "zustand";

import type { TeacherWithUser } from "@/services/types";

type TeacherSheetType = "create" | "edit" | "delete";

interface TeacherSheetState {
  isOpen: boolean;
  type: TeacherSheetType | null;
  data: Partial<TeacherWithUser>;
  onOpen: (type: TeacherSheetType, data?: Partial<TeacherWithUser>) => void;
  onClose: () => void;
}

export const useTeachersSheet = create<TeacherSheetState>()((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}));
