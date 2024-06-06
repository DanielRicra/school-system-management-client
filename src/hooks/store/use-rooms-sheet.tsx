import type { Room } from "@/services/types";
import { create } from "zustand";

type RoomSheetType = "create" | "edit" | "delete";

interface RoomSheetState {
  isOpen: boolean;
  type: RoomSheetType | null;
  data: Partial<Room>;
  onOpen: (type: RoomSheetType, data?: Partial<Room>) => void;
  onClose: () => void;
}

export const useRoomsSheet = create<RoomSheetState>()((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
  onClose: () => set(() => ({ isOpen: false, type: null, data: {} })),
}));
