import { type MockEntity } from "shared/const/mock-data.types";

export interface MockData {
  id: number;
  active: boolean;

  title: string;
  createdAt: string;
}

export const mockDataAdapter = (data: MockEntity[]): MockData[] => {
  return data
    .map((item) => {
      const id = item.id;
      const active = item.active;
      const title = item.name ?? item.description ?? item.title ?? "";
      const createdAt = item.createdAt ?? item.publishedAt;

      return {
        id,
        active,
        title,
        createdAt,
      };
    })
    .filter(Boolean);
};
