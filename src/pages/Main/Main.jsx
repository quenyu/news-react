import styles from "./styles.module.css";

import { NewsBannerWithSkeleton } from "../../components/NewsBanner/NewsBanner";
import { getCategories, getNews } from "../../api/apiNews";
import { NewsListWithSkeleton } from "../../components/NewsList/NewsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { Categories } from "../../components/Categories/Categories";
import { Search } from "../../components/Search/Search";
import { useDebounce } from "../../helpers/hooks/useDebounce";

import { PAGE_SIZE, TOTAL_PAGES } from "../../constants/constants";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useFilters } from "../../helpers/hooks/useFilters";

export const Main = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    pageSize: PAGE_SIZE,
    category: null,
    keywords: '',
  })

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const { data: dataCategories } = useFetch(getCategories);

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1);
    }
  };

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_number', filters.page_number - 1);
    }
  };

  const handlePageClick = (page_number) => {
    changeFilter('page_number', page_number - 1);
  };

  return (
    <main className={styles.main}>
      {dataCategories ?
        <Categories
          categories={dataCategories.categories}
          selectedCategory={filters.category}
          setSelectedCategory={(category) => changeFilter('category', category)}
        /> : null}
      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilter('keywords', keywords)}
      />

      <NewsBannerWithSkeleton isLoading={isLoading} item={data && data.news && data.news[0]} />

      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />

      <NewsListWithSkeleton isLoading={isLoading} news={data?.news} />

      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />
    </main>
  );
};