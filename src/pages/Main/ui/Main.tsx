import React, { memo, useMemo, useState } from "react";
import cls from "./Main.module.scss";
import { products } from "../../../shared/const/mock-data";
import { classNames } from "../../../shared/lib/classNames/classNames";
import { InfoRow } from "../../../widgets/InfoRow";
import {
  type MockData,
  mockDataAdapter,
} from "../../../shared/lib/mockDataAdapter/mockData.adapter";
import { type MockEntity } from "shared/const/mock-data.types";
import { type SortType, usePosts } from "../../../shared/hooks/usePosts";

interface MainPageProps {
  className?: string;
}
export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;
  const [data, setData] = useState<MockData[]>(
    mockDataAdapter(products as MockEntity[])
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<{
    sort: SortType;
    query: string;
  }>({
    sort: "",
    query: "",
  });
  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, data]
  );

  const sortedAndSearchedPosts = usePosts(
    filteredData,
    filter.sort,
    filter.query
  );

  const onChangeSearchHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearch(e.currentTarget.value);
  };
  const onChangeSelectHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedSort = e.target.value as SortType;
    setFilter((prevState) => {
      return { ...prevState, sort: selectedSort };
    });
  };

  return (
    <div className={classNames(cls.main, {}, [className])}>
      <div className={cls.navbar}>
        <div>
          <input
            placeholder="Поиск"
            value={search}
            onChange={onChangeSearchHandler}
            className={cls.input}
          />
        </div>
        <div>
          <select value={filter.sort} onChange={onChangeSelectHandler}>
            <option disabled>Сортировка</option>
            {[
              { value: "title", name: "По заголовку" },
              { value: "createdAt", name: "По дате" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={cls.content}>
        <div className={cls.topLine}>
          <div className={cls.title}>Name</div>
          <div className={cls.status}>Status</div>
          <div className={cls.created}>Created</div>
        </div>
        {sortedAndSearchedPosts.map((product, index) => (
          <InfoRow
            id={product.id}
            name={product.title}
            status={product.active}
            created={product.createdAt}
            key={product.id}
            setData={setData}
            className={cls.block}
          />
        ))}
      </div>
    </div>
  );
});

MainPage.displayName = "MainPage";
