import { create } from "zustand";

type StudentSheetType = "create" | "edit";

interface StudentSheetState {
  isOpen: boolean;
  type: StudentSheetType | null;
  onOpen: (type: StudentSheetType) => void;
  onClose: () => void;
}

export const useStudentsSheet = create<StudentSheetState>()((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set(() => ({ isOpen: true, type })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}));
