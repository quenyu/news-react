import { withSkeleton } from '../../helpers/hocs/withSkeleton';
import { NewsItem } from '../NewsItem/NewsItem';

import styles from './styles.module.css';

export const NewsList = ({ news }) => {
    return (
        <ul className={styles.list}>
            {news.map(item => {
                return <NewsItem key={item.id} item={item}/>
            })}
        </ul>
    )
}


export const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10);