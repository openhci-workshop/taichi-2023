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

const Carousel = () => {
    const [contentOrder, setContentOrder] = useState([1, 2, 3]);
    const [direction, setDirection] = useState(null);

    const shiftLeft = () => {
        setDirection('left');
        setContentOrder(prevOrder => [prevOrder[1], prevOrder[2], prevOrder[0]]);
    };

    const shiftRight = () => {
        setDirection('right');
        setContentOrder(prevOrder => [prevOrder[2], prevOrder[0], prevOrder[1]]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.cardsWrapper}>
                <ul className={styles.cardsContainer}>
                    {contentOrder.map((order, index) => (
                        <React.Fragment key={order}>
                            {index === 1 && (
                                <div className={`${styles.button} ${styles.leftButton}`} onClick={shiftLeft}>
                                    <Button iconPath="/speakers/leftvector.png"> </Button>
                                </div>
                            )}
                            <li key={order} className={`${styles.box} ${styles[`box${order}`]}  ${direction === 'left' ? styles[`move-to-position${index + 1}-from-left`] : styles[`move-to-position${index + 1}-from-right`]}`}>
                                <img src={`/speakers/speaker${order}.jpg`} className={styles.boxImage} alt={`Speaker Photo`} />
                                <div className={classnames(notoSansTC.className, 'font-regular')}>
                                    {order === 1 && (
                                        <a href="https://www.edchi.net/" target="_blank">
                                            <div className={styles.textbox}>
                                                <h5>ED CHI</h5>
                                                <p>Distinguished Scientist</p>
                                                <p>Google DeepMind</p>
                                            </div>
                                        </a>
                                    )}
                                    {order === 2 && (
                                        <a href="https://www.colorado.edu/atlas/ellen-yi-luen-do" target="_blank">
                                            <div className={styles.textbox}>
                                                <h5>ELLEN YI-LUEN DO</h5>
                                                <p>ATLAS Institute Professor</p>
                                                <p>University of Colorado Boulder</p>
                                            </div>
                                        </a>
                                    )}
                                    {order === 3 && (
                                        <a href="https://www.shengdongzhao.com/" target="_blank">
                                            <div className={styles.textbox}>
                                                <h5>ED SHENGDONG ZHAO</h5>
                                                <p>Associate Professor</p>
                                                <p>National University of Singapore</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </li>
                            {index === 1 && (
                                <div className={`${styles.button} ${styles.rightButton}`} onClick={shiftRight}>
                                    <Button iconPath="/speakers/rightvector.png"> </Button>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Carousel;
