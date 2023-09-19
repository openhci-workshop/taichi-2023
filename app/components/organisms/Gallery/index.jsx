"use client";
import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/components/atoms/CarouselButton';
import classnames from 'classnames';
import { Noto_Sans_TC } from 'next/font/google';

const notoSansTC = Noto_Sans_TC({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
});

const Gallery = () => {
  return (
    <div>gallery</div>
  )
}

export default Gallery