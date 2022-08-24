// export interface ResponseData {
//   data: any;
//   headers?: any;
// }

export default interface ResponseData<T = any> {
  headers?: any;
  data: T;
  todos: T;
}
