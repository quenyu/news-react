import { BannersListWithSkeleton } from '../BannersList/BannersList';

import styles from './styles.module.css';

export const LatestNews = ({ banners, isLoading }) => {
    return (
        <section className={styles.section}>
            <BannersListWithSkeleton banners={banners} isLoading={isLoading} />
        </section>
    )
}