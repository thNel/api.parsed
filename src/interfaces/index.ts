export * from './user';
export * from './dump';

export interface ServerMessage {
  success?: boolean,
  error?: boolean,
  message: string,
}

type DeepRecord<K extends keyof any, T> = {[P in K]:  T | DeepRecord<K, T>}

export interface AxiosParams {
  url: string,
  config?: DeepRecord<string, string>;
}