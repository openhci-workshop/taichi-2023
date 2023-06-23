"use client"

import React, { useState, useEffect } from "react";

import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { Aldrich } from 'next/font/google';

import Button from '@/components/atoms/Button';

import styles from './styles.module.scss';
import Logo from '../../../../public/logo_nav.png';
import AltLogo from '../../../../public/open_logo.png';

const MIN_WIDTH = 950;

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const NavBar = () => {
  const [navActive, setNavActive] = useState(false);
  const [width, setWidth] = useState(0);

  function scrollToElement(id) {
    const element = document.getElementById(id); // Replace 'targetElement' with the ID of the element you want to scroll to
    const offsetTop = element.offsetTop;
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
      <div className="flex items-center justify-between px-4 pl-0 fixed top-0 left-0 right-0 h-16 md:h-20 bg-black z-10">
        <div className="flex flex-row items-center space-x-1">
          <Link href="/">
            <Image src={Logo} alt="logo" className="h-12 md:h-16 w-auto ml-2 md:ml-4 mr-1 md:mr-3" />
          </Link>
          |
          <Link href="https://www.2023.openhci.com/" target="_blank">
            <Image src={AltLogo} alt="alt-logo" className="h-3 md:h-5 w-auto ml-0 md:ml-2 mt-1" />
          </Link>
        </div>
        <div>
        {
          width > MIN_WIDTH ? (
            <nav className="flex flex-row items-center">
              <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("keynote")}}>KEYNOTE</div>
              <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("submission")}}>SUBMISSION</div>
              {/* <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("registration")}}>REGISTRATION</div> */}
              {/* <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("agenda")}}>AGENDA</div> */}
              {/* <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("award")}}>AWARD</div> */}
              <div className={classnames(aldrich.className, styles.navItem, 'text-white md:text-base font-regular mx-2 tracking-wider')} onClick={() => {scrollToElement("organizers")}}>ORGANIZERS</div>
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
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("keynote");}}>KEYNOTE</div>
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("submission");}}>SUBMISSION</div>         
            {/* <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("registration");}}>REGISTRATION</div> */}
            {/* <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("agenda");}}>AGENDA</div> */}
            {/* <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("award");}}>AWARD</div> */}
            <div className={classnames(aldrich.className, 'text-black md:text-base font-regular tracking-wider')} onClick={() => {setNavActive(false); scrollToElement("organizers");}}>ORGANIZERS</div>
          {/* <Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
            <Button variant='normal'>論文投稿</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;