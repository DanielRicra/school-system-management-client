import { create } from "zustand";

type RoomSheetType = "create" | "edit";

interface RoomSheetState {
  isOpen: boolean;
  type: RoomSheetType | null;
  onOpen: (type: RoomSheetType) => void;
  onClose: () => void;
}

export const useRoomsSheet = create<RoomSheetState>()((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set(() => ({ isOpen: true, type })),
  onClose: () => set(() => ({ isOpen: false, type: null })),
}));
