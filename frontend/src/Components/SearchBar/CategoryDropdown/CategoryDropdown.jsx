import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CategoryDropdown.module.scss';
import Select from 'react-select';
import { categoryOptions } from '../searchMockData';

const cx = classNames.bind(styles);



function CategoryDropdown(props) {
  const [isClearable, setIsClearable] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(true)
  const [isSearchable, setIsSearchable] = useState(false)

  const changeHandle = ( event ) => {
    const value = event.value
    if (value === '영상별 분석') {
      props.setCategorySelect(true)
    } else if (value === '댓글 기간별 분석'){
      props.setCategorySelect(false)
    }
    }
    

  return (
    <div className={cx("container")}>
      <div className={cx("menu-container")}>
      <Select
          className={cx("basic-single")}
          classNamePrefix="select"
          defaultValue={categoryOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={categoryOptions}
          onChange={changeHandle}
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

export default CategoryDropdown;