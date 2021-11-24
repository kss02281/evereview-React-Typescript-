import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import Select from 'react-select';
import { colourOptions } from '../searchMockData';

const cx = classNames.bind(styles);

function SearchDropdown() {
    return (
      <div className={cx("searchContainer")}>
        <div className={cx("menu-container")}>
        <Select
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="colors"
          options={colourOptions}
          className={cx("basic-multi-select")}
          classNamePrefix="select"
        />
  
          <div
            style={{
              color: 'hsl(0, 0%, 40%)',
              display: 'inline-block',
              fontSize: 12,
              fontStyle: 'italic',
              marginTop: '1em',
            }}
          >
          </div>
        </div>
      </div>
    );
}

export default SearchDropdown;