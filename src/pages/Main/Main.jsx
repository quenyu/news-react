import { useEffect, useState } from 'react';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import { NewList } from '../../components/NewList/NewList';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Pagination } from '../../components/Pagination/Pagination';

export const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true)
      const response = await getNews(currentPage, pageSize);
      setNews(response.news);
      setIsLoading(false)
    } catch (e) {
      console.log("ERROR", e)
    }
  }

  useEffect(() => {

    fetchNews(currentPage);
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading
        ? <NewsBanner item={news[0]} />
        : <Skeleton />}

      <NewList news={news}/>

      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      {!isLoading ? <NewList news={news} /> : <Skeleton count={10} type={'item'} />}

      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
        : <Skeleton count={1} type={'banner'} />

      {!isLoading ? <NewList news={news} /> : <Skeleton count={10} type={'item'} />}
    </main>
  )
}