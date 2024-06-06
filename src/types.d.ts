export type QueryString = Record<
  string,
  string | number | undefined | string[]
>;

export type RoomSearchQuery = {
  "capacity.gte"?: number;
  "capacity.lte"?: number;
  room_number?: string;
};
