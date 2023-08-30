export * from './user';
export * from './dump';

export interface ServerMessage {
  success?: boolean,
  error?: boolean,
  message: string,
}