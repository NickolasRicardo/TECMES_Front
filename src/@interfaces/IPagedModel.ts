export interface IPagedModel {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: any[] | [];
}
