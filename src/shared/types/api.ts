export interface IApiError {
  code: number;
  key: string;
  message: string;
  path: string;
  details: Record<string, string>;
}

export interface IPaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  error: IApiError | null;
  timestamp: string;
}