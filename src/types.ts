export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; message: string }
