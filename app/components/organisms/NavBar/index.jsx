"use client"

import React, { useState, useEffect } from "react";

import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { Aldrich, Noto_Sans_TC } from 'next/font/google';

import Button from '@/components/atoms/Button';

import styles from './styles.module.scss';
import Logo from '../../../../public/logo_nav.png';
import AltLogo from '../../../../public/open_logo.png';

const MIN_WIDTH = 1024;

const notoSansTC = Noto_Sans_TC({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const NavBar = () => {
  const [navActive, setNavActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState('');

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
      <div className="flex items-center justify-between mx-auto px-2 md:px-8 fixed top-0 left-0 right-0 h-16 md:h-20 bg-black z-50">
        <div className="flex flex-row items-center space-x-1">
          <Link href="/">
            <Image src={Logo} alt="logo" className="h-10 md:h-14 w-auto ml-2 md:ml-4 mr-1 md:mr-3" />
          </Link>
          <Link href="https://www.2023.openhci.com/" target="_blank">
            <Image src={AltLogo} alt="alt-logo" className="h-4 md:h-6 w-auto ml-0 md:ml-2 mt-1" />
          </Link>
        </div>
        <div>
        {
          width > MIN_WIDTH ? (
            <nav className="flex flex-row items-center">
              <Link href="/">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>首頁</div>
              </Link>
              <Link href="/keynote">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>主題演講</div>
              </Link>
              <Link href="/agenda">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>詳細議程</div>
              </Link>
              <Link href="/reg">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>註冊會議</div>
              </Link>
              <Link href="/venue">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>場地資訊</div>
              </Link>
              <Link href="/cfp">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>參與號召</div>
              </Link>
              <Link href="/sv">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>學生志工</div>
              </Link>
              <Link href="/org">
                <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')}>組織成員</div>
              </Link>
              <Link href="https://taichi2023.kktix.cc/events/6844edd1" target="_blank">
                <Button className="md: mx-4" variant='normal'>註冊會議</Button>
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
          <Link href="/">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>首頁</div>
          </Link>
          <Link href="/keynote">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>主題演講</div>
          </Link>
          <Link href="/agenda">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>詳細議程</div>
          </Link>
          <Link href="/reg">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>註冊會議</div>
          </Link>
          <Link href="/venue">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>場地資訊</div>
          </Link>
          <Link href="/cfp">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>參與號召</div>
          </Link>
          <Link href="/sv">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>學生志工</div>
          </Link>
          <Link href="/org">
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')}>組織成員</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;