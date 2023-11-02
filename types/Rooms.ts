export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'hdmgather',
  CUSTOM = 'custom',
}

export interface IRoomData {
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}
