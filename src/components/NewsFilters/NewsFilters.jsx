import { useFetch } from '../../helpers/hooks/useFetch';

import { getCategories } from '../../api/apiNews';
import { Categories } from '../Categories/Categories';
import { Search } from '../Search/Search';

import styles from './styles.module.css';
import { Slider } from '../Slider/Slider';

export const NewsFilters = ({ filters, changeFilter }) => {
  const { data: dataCategories } = useFetch(getCategories);

  return (
    <div className={styles.filters}>
      {dataCategories ?
        <Slider>
          <Categories
            categories={dataCategories.categories}
            selectedCategory={filters.category}
            setSelectedCategory={(category) => changeFilter('category', category)}
          />
        </Slider>
        : null}
      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilter('keywords', keywords)}
      />
    </div>
  )
}