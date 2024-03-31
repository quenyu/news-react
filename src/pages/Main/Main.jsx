import { useEffect, useState } from 'react';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import { NewList } from '../../components/NewList/NewList';
import { Skeleton } from '../../components/Skeleton/Skeleton';

export const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const response = await getNews();
        setNews(response.news);
        setIsLoading(false)
      } catch (e) {
        console.log("ERROR", e)
      }
    }
    fetchNews();
  }, [])

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading
        ? <NewsBanner item={news[0]} />
        : <Skeleton count={1} type={'banner'} />}

      {!isLoading ? <NewList news={news} /> : <Skeleton count={10} type={'item'} />}
    </main>
  )
}