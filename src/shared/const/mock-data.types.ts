interface MockBase {
  id: number;
  active: boolean;
}

export interface Product extends MockBase {
  name: string;
  createdAt: string;
}

export interface PricePlan extends MockBase {
  description: string;
  createdAt: string;
  removedAt: string;
}

export interface Page extends MockBase {
  title: string;
  updatedAt: string;
  publishedAt: string;
}

export type MockEntity = Product & PricePlan & Page;
