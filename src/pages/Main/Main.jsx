import { useEffect, useState } from 'react';
import { NewsBanner } from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../api/apiNews';
import { NewList } from '../../components/NewList/NewList';

export const Main = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        setNews(response.news);
      } catch (e) {
        console.log("ERROR", e)
      }
    }
    fetchNews();
  }, [])

  return (
    <main className={styles.main}>
      {news.length > 0
        ? <NewsBanner item={news[0]} />
        : null}

      <NewList news={news}/>
    </main>
  )
}