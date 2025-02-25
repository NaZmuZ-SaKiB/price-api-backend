const calculatePagination = (filters: Record<string, any>) => {
  const page = filters?.page ? +filters.page : 1;
  const limit = filters?.limit ? +filters.limit : 10;
  const skip = (page - 1) * limit;
  const sort = filters?.sortBy || 'createdAt';
  const sortOrder = filters?.sortOrder === 'asc' ? 1 : -1;

  return { page, limit, skip, sort, sortOrder };
};

export default calculatePagination;
