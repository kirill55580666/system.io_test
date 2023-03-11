import { useMemo } from "react";
import { type MockData } from "../../shared/lib/mockDataAdapter/mockData.adapter";

enum SortEnum {
  TITLE = "title",
  CREATED_AT = "createdAt",
}

export type SortType = SortEnum | "";

export const useSortedPosts = (
  data: MockData[],
  sort: SortType
): MockData[] => {
  const sortedData = useMemo(() => {
    if (sort) {
      return [...data].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return data;
  }, [sort, data]);

  return sortedData;
};

export const usePosts = (
  data: MockData[],
  sort: SortType,
  query: string
): MockData[] => {
  const sortedPosts = useSortedPosts(data, sort);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
