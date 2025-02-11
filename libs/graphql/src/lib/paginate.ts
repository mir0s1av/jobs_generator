export function paginate<T extends { id: number }>(array: T[], first: number) {
  const edges = array.slice(0, first).map((user) => ({
    node: user,
    cursor: user.id,
  }));

  // Determine if there's a next page
  const hasNextPage = array.length > first;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  return {
    edges,
    pageInfo: {
      endCursor,
      hasNextPage,
    },
  };
}
