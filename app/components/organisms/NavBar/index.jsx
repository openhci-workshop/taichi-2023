"use client"

import React, { useState, useEffect } from "react";

import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { Aldrich } from 'next/font/google';

import Button from '@/components/atoms/Button';

import styles from './styles.module.scss';
import Logo from '../../../../public/logo_nav.png';

const MIN_WIDTH = 970;

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const NavBar = () => {
  const [navActive, setNavActive] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // Initial window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between px-4 pl-0 fixed top-0 left-0 right-0 h-16 md:h-20 bg-black z-10">
        <Link href="/">
          <Image src={Logo} alt="taichi-logo" className="h-12 md:h-16 w-auto ml-4" />
        </Link>
        <div>
        {
          width > MIN_WIDTH ? (
            <nav className="flex flex-row items-center">
              <Link href="/#keynote">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>keynote</div>
              </Link>
              <Link href="/#submission">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>submission</div>
              </Link>
              <Link href="/#registration">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>registration</div>
              </Link>
              <Link href="/#agenda">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>agenda</div>
              </Link>
              <Link href="/#award">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>award</div>
              </Link>
              <Link href="/#organizers">
                <div className={classnames(aldrich.className, 'text-white md:text-base font-regular mx-2 tracking-wider')}>organizers</div>
              </Link>
              <Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
                <Button className="md: mx-4" variant='normal'>論文投稿</Button>
              </Link>
            </nav>
          ) : (
            <div>
              <div className={navActive ? classnames(styles.closer): classnames(styles.nav)} onClick={() => {setNavActive(!navActive)}}>
                <div className={classnames(styles.navStrip)}></div>
                <div className={classnames(styles.navStrip)}></div>
                <div className={classnames(styles.navStrip)}></div>
              </div>
            </div>
          )
        }
        </div>
      </div>
      <div className={navActive ? classnames(styles.navOverlay): classnames(styles.navOverlay_closed)}>
        <div className="flex flex-col gap-y-10 items-center">
          <Link href="/#keynote" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>keynote</div>
          </Link>
          <Link href="/#submission" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>submission</div>
          </Link>
          <Link href="/#registration" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>registration</div>
          </Link>
          <Link href="/#agenda" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>agenda</div>
          </Link>
          <Link href="/#award" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>award</div>
          </Link>
          <Link href="/#organizers" onClick={() => {setNavActive(false)}}>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')}>organizers</div>
          </Link>
          {/* <Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
            <Button variant='normal'>論文投稿</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;