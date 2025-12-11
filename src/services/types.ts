export type Pagination = {
  page: number;
  limit: number;
};

export type HasPagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type FilterBase = {
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
};
