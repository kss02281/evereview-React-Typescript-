import React, { Fragment } from 'react';
import { Navbar } from '../Components/common';
import Slider from 'react-slick';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import VerticalCarousel from '../Components/verticalSlider/VerticalCarousel';
import mockData from '../constants/mockData.json';

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <Fragment>
      <Navbar />
      <VerticalCarousel data={mockData.data} leadingText="" />
    </Fragment>
  );
}

export default NotFound;
