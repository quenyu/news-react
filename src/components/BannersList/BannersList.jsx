import { withSkeleton } from '../../helpers/hocs/withSkeleton';
import { NewsBannerWithSkeleton } from '../NewsBanner/NewsBanner';

import styles from './styles.module.css';

const BannersList = ({ banners }) => {
    return (
        <ul className={styles.banners}>
            {banners?.map(banner => 
                <NewsBannerWithSkeleton key={banner.id} item={banner} />
            )}
        </ul>
    )
}

export const BannersListWithSkeleton = withSkeleton(BannersList, 'banner', 10, 'row')