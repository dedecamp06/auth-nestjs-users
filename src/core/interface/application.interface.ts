export interface ApplicationInterface<T = any> {
  run: (param: T, request?: any) => Promise<any>;
}
