import type { Classroom } from "@/services/types";
import { create } from "zustand";

type SheetType = "create" | "edit" | "delete";

interface ClassroomSheetState {
  isOpen: boolean;
  type: SheetType | null;
  data: Partial<Classroom>;
  onOpen: (type: SheetType, data?: Partial<Classroom>) => void;
  onClose: () => void;
}

export const useClassroomsSheet = create<ClassroomSheetState>()((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, type: null, data: {} })),
}));
