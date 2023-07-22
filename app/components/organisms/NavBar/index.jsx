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

const sections = [
  {"y": 0,  "title": ""},
  {"y": 1000,  "title": "KEYNOTE"},
  {"y": 1800, "title": "SUBMISSION"},
  {"y": 8000, "title": "REG"},
  {"y": 8600, "title": "SV"},
  {"y": 10500, "title": "ORGANIZERS"}
]

const NavBar = () => {
  const [navActive, setNavActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState('');

  useEffect(() => {
    const options = { passive: true };

    const scroll = (event) => {
      const { scrollY } = window;

      let current = "";
      // console.log("scrollY", scrollY)
      sections.forEach((section) => {
        if (scrollY >= section.y) {
          current = section.title;
        }
      });

      setActive(current);
    };

    document.addEventListener("scroll", scroll, options);
    () => document.removeEventListener("scroll", scroll, options);
  });

  function scrollToElement(id) {
    const element = document.getElementById(id); // Replace 'targetElement' with the ID of the element you want to scroll to
    const motionOffset = width > MIN_WIDTH ? 350 : 300;
    const offsetTop = element.offsetTop + motionOffset;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  }

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
              <div className={classnames(notoSansTC.className, styles.navItem, active === 'KEYNOTE' && styles.navItem_active, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("keynote")}}>主題演講</div>
              <div className={classnames(notoSansTC.className, styles.navItem, active === 'SUBMISSION' && styles.navItem_active, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("submission")}}>參與號召</div>
              <div className={classnames(notoSansTC.className, styles.navItem, active === 'REG' && styles.navItem_active, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("registration")}}>註冊會議</div>
              {/* <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("agenda")}}>議程內容</div> */}
              {/* <div className={classnames(notoSansTC.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("award")}}>獲獎資訊</div> */}
              <div className={classnames(notoSansTC.className, styles.navItem, active === 'SV' && styles.navItem_active, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("sv")}}>學生志工</div>
              <div className={classnames(notoSansTC.className, styles.navItem, active === 'ORGANIZERS' && styles.navItem_active, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("organizers")}}>組織成員</div>
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
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("keynote");}}>主題演講</div>
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("submission");}}>參與號召</div>         
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("registration");}}>註冊會議</div>
            {/* <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("agenda");}}>議程內容</div> */}
            {/* <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("award");}}>獲獎資訊</div> */}
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("sv");}}>學生志工</div>
            <div className={classnames(notoSansTC.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("organizers");}}>組織成員</div>
          {/* <Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
            <Button variant='normal'>論文投稿</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;